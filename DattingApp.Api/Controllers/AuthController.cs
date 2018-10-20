using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using DattingApp.Api.Data;
using DattingApp.Api.Dtos;
using DattingApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DattingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            this._config = config;
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

        [HttpPost("login")]
        public async Task<IActionResult> login(UserLoginDto userLoginDto) 
        {
            var user = await _repo.Login(userLoginDto.Username.ToLower(),userLoginDto.Password);
            
            if(user==null)
                return Unauthorized();

            // Create token an sent;
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
        
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor(){
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenhandler = new JwtSecurityTokenHandler();

            var token = tokenhandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenhandler.WriteToken(token) });
        }

    }
}