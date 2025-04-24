using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenServices _tokenServices;
        private readonly DataContext _context;

        // Constructor'daki tokenService'yi doğru şekilde atadım.
        public AccountController(UserManager<AppUser> userManager, TokenServices tokenServices, DataContext context)
        {
            _userManager = userManager;
            _tokenServices = tokenServices;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "username hatalı" });
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            if (result)
            {
                var userCart = await GetOrCreate(model.UserName);
                var cookieCart = await GetOrCreate(Request.Cookies["CustomerID"]);

                if (userCart != null && cookieCart != null)
                {
                    // Kullanıcı kartındaki ürünleri cookie kartına ekliyoruz
                    foreach (var item in userCart.CartItems)
                    {
                        cookieCart.AddItem(item.Product, item.Quantity);
                    }
                    _context.Carts.Remove(userCart);
                    await _context.SaveChangesAsync();
                }

                cookieCart.CustomerID = model.UserName;
                await _context.SaveChangesAsync();

                return Ok(new UserDTO
                {
                    Name = user.Name!,
                    Token = await _tokenServices.GenerateToken(user)
                });
            }

            return Unauthorized();
        }

        // Yeni kullanıcı oluşturuluyor
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser
            {
                Name = model.Name,
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return StatusCode(201);
            }

            return BadRequest(result.Errors);
        }

        // Kullanıcıyı getiren metod
        [Authorize]
        [HttpGet("getuser")]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest(new ProblemDetails { Title = "Kullanıcı kimliği bulunamadı" });
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "username ya da parola hatalı" });
            }

            return new UserDTO
            {
                Name = user.Name!,
                Token = await _tokenServices.GenerateToken(user)
            };
        }

        // Sepet oluşturma veya alma
        private async Task<Cart> GetOrCreate(string userName)
        {
            var cart = await _context.Carts.Include(c => c.CartItems).ThenInclude(i => i.Product)
                           .FirstOrDefaultAsync(c => c.CustomerID == userName);

            if (cart == null)
            {
                cart = new Cart { CustomerID = userName };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }
    }
}
