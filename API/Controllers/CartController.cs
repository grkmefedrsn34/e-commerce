using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;
{
    
}
{
    
}

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class CartController:ControllerBase
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<Cart>>GetCart()
        {
            var cart =await  GetOrCreate();
            return cart;
        }
        [HttpPost]
        public async Task<ActionResult>AddItemToCart(int ProductID , int Quantity)
        {
            var cart =await  GetOrCreate();
            var product = await _context.Products.FindOrDefaultAsync(i=> i.ID == ProductID);

            if(product == null)
                return NotFound("the product is not in database");
            cart.AddItem(product,Quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if(result)
                return CreatedAtAction(nameof(GetCart),cart);
            return BadRequest(new ProblemDetails {Title = "Failed to add item to cart" });
        }

        private async Task<Cart> GetOrCreate()
        {
            var cart = await _context.Carts
                             .Include(in => int.CartItem)
                             .ThenInclude(in => int.Product)
                             .Where(in => int.CustomerID == Request.Cookies["customer ID"])
                             .FirstOrDefaultAsync();
            if(cart== null)
            {
                var customerıd = Guid.NewGuid().ToString();
                var CookieOptions = new CookieOptions{
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };
                Response.Cookies.Append("customer ID",customerıd,CookieOptions);
                cart = new Cart {CustomerID = customerıd};
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }
    }
}