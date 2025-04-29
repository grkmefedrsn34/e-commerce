using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var username = User.Identity?.Name;

            if (username == null)
            {
                return Unauthorized();
            }

            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.CustomerID == username)
                .Select(o => new OrderDTO
                {
                    ID = o.ID,
                    CustomerID = o.CustomerID,
                    FirstName = o.FirstName,
                    LastName = o.LastName,
                    Phone = o.Phone,
                    City = o.City,
                    AddresLine = o.AddresLine,
                    OrderDate = o.OrderDate,
                    OrderStatus = o.OrderStatus,
                    SubTotal = o.SubTotal,
                    DeliveryFree = o.DeliveryFree,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
                    {
                        ID = oi.ID,
                        OrderID = oi.OrderID.ToString(),
                        ProductID = oi.ProductID,
                        ProductName = oi.ProductName,
                        ProductImage = oi.ProductImage,
                        Price = oi.Price,
                        Quantity = oi.Quantity
                    }).ToList()
                })
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO?>> GetOrder(int id)
        {
            var username = User.Identity?.Name;

            if (username == null)
            {
                return Unauthorized();
            }

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.ID == id && o.CustomerID == username)
                .Select(o => new OrderDTO
                {
                    ID = o.ID,
                    CustomerID = o.CustomerID,
                    FirstName = o.FirstName,
                    LastName = o.LastName,
                    Phone = o.Phone,
                    City = o.City,
                    AddresLine = o.AddresLine,
                    OrderDate = o.OrderDate,
                    OrderStatus = o.OrderStatus,
                    SubTotal = o.SubTotal,
                    DeliveryFree = o.DeliveryFree,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
                    {
                        ID = oi.ID,
                        OrderID = oi.OrderID.ToString(),
                        ProductID = oi.ProductID,
                        ProductName = oi.ProductName,
                        ProductImage = oi.ProductImage,
                        Price = oi.Price,
                        Quantity = oi.Quantity
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (order == null)
                return NotFound();

            return order;
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO orderDto)
        {
            var cart = await _context.Carts.Include(c => c.CartItems)
                .ThenInclude(i => i.Product)
                .Where(c => c.CustomerID == User.Identity!.Name)
                .FirstOrDefaultAsync();
            if (cart == null)
            {
                return BadRequest(new ProblemDetails { Title = "Problem getting cart" });
            }
            if (cart.CartItems.Count == null)
            {
                return BadRequest(new ProblemDetails { Title = "Cart is empty" });
            }

            var items = new List<OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductID);
                var orderItem = new OrderItem
                {
                    ProductID = product!.ID,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subtotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFree = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerID = User.Identity!.Name,
                FirstName = orderDto.FirstName,
                LastName = orderDto.LastName,
                Phone = orderDto.Phone,
                City = orderDto.City,
                AddresLine = orderDto.AddresLine,
                SubTotal = subtotal,
                DeliveryFree = deliveryFree,    
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)
            {
                return CreatedAtRoute(nameof(GetOrder), new {id=order.ID},order.ID);
            }
            return BadRequest(new ProblemDetails { Title = "Problem creating order" });
        }
    }
}
