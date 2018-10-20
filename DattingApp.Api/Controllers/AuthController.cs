using System.Threading.Tasks;
using DattingApp.Api.Data;
using DattingApp.Api.Dtos;
using DattingApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto) 
        {
            // Validate user
            userRegisterDto.Username = userRegisterDto.Username.ToLower();

            if(await _repo.UserExists(userRegisterDto.Username))
               return BadRequest("Username already Exists");

            var userToCreate = new User() {
                Username = userRegisterDto.Username
            };

            var user = await _repo.Register(userToCreate, userRegisterDto.Password);
            return StatusCode(201);
            // return Ok(" ok ");
        }
    }
}