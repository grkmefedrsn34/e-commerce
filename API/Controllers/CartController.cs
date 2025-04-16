using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;
using API.DTO;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            return cartToDTO(await GetOrCreate());
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ID == productId);

            if (product == null)
                return NotFound("The product is not in the database");

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetCart), cartToDTO(cart));

            return BadRequest(new ProblemDetails { Title = "Failed to add item to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            
            cart.DeleteItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok();
            }
            return BadRequest(new ProblemDetails { Title = "Failed to delete item from cart" });
        }

        private async Task<Cart> GetOrCreate()
        {
            var customerId = Request.Cookies["customerID"];

            var cart = await _context.Carts
                            .Include(c => c.CartItems)
                            .ThenInclude(ci => ci.Product)
                            .FirstOrDefaultAsync(c => c.CustomerID == customerId);

            if (cart == null)
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };

                Response.Cookies.Append("customerID", customerId, cookieOptions);

                cart = new Cart { CustomerID = customerId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }

        private CartDTO cartToDTO(Cart cart)
        {
            return new CartDTO
            {
                CartID = cart.CartID,
                CustomerID = cart.CustomerID,
                CartItems = cart.CartItems.Select(item => new CartItemDTO
                {
                    ProductID = item.ProductID,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    ImageUrl = item.Product.ImageUrl
                }).ToList()
            };
        }
    }
}
