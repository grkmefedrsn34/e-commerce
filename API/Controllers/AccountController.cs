using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using API.Services;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenServices tokenServices;

        public AccountController(UserManager<AppUser> userManager,TokenServices _tokenServices)
        {
            _userManager = userManager;
            tokenServices = _tokenServices;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new { message = "Kullanıcı bulunamadı" });
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (result)
            {
                return Ok(new UserDTO
                {
                    Name = user.Name!,
                    Token = await tokenServices.GenerateToken(user)
                });
            }

            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.Name,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if(result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return StatusCode(201, new { message = "Kullanıcı başarıyla oluşturuldu" });
            }

            return BadRequest(new { message = "Kullanıcı oluşturulamadı", errors = result.Errors });
        }

        [Authorize]
        [HttpGet("getuser")]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name!);
            if(user == null)
            {
                return BadRequest(new { message = "Kullanıcı bulunamadı" });
            }
            return new UserDTO
            {
                Name = user.Name!,
                Token = await tokenServices.GenerateToken(user)
            };
        }

    }
}
