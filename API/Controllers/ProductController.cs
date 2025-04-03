using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/products
    public class ProductController : ControllerBase
    {
        private readonly DataContext context;

        public ProductController(DataContext _context)
        {
            context = _context;
        }

        // Tüm ürünleri dönen GET
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await context.Products.ToListAsync();
            return Ok(products);
        }

        // ID'ye göre ürünü dönen GET
        [HttpGet("{id}")]  // Burada {id} parametresini rota olarak belirledik.
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }
    }
}
