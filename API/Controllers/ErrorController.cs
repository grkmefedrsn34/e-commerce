using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class  ErrorController : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult ErrorNotFound()
        {
            return NotFound();//404
        }

        [HttpGet("bad-request")]
        public IActionResult BadRequestError()
        {
            return BadRequest();//400
        }

        [HttpGet("unauthorized")]
        public IActionResult UnAuthorizedError()
        {
            return Unauthorized(); // 401
        }

        [HttpGet("server-error")]
        public IActionResult ServerError()
        {
            throw new Exception("server error");
        }
        [HttpGet("validation-error")]
        public IActionResult ValidationError()
        {
          ModelState.AddModelError("validation error 1","validation error details");
          return ValidationProblem();
        }
        
    }
}