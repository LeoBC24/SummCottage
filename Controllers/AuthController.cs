using Microsoft.AspNetCore.Mvc;
using LoginBackend.Models;
using LoginBackend.Services;

namespace LoginBackend.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Name) ||
                string.IsNullOrEmpty(user.Email) ||
                string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "All fields are required" });
            }

            var existing = await _userService.GetByEmailAsync(user.Email);
            if (existing != null)
            {
                return BadRequest(new { message = "User already exists" });
            }

            await _userService.CreateAsync(user);
            return StatusCode(201, new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginData)
        {
            if (loginData == null ||
                string.IsNullOrEmpty(loginData.Email) ||
                string.IsNullOrEmpty(loginData.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            var user = await _userService.GetByEmailAsync(loginData.Email);

            if (user == null || user.Password != loginData.Password)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new { message = "Login successful" });
        }
    }
}


