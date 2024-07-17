using authservice.Authenticate;
using authservice.Context;
using authservice.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace authservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ChatContext _dbContext;

        public AuthController(ChatContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistationRequest model)
        {
            if (_dbContext.Users.Any(u => u.Username == model.Username))
            {
                return BadRequest();
            }
            string passwordHash = HashPassword(model.Password);
            var user = new User
            {
                Username = model.Username,
                HashedPassword = passwordHash,
            };
            try
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
            catch
            {
                return Problem();
            }
            return Ok();
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Username.Equals(model.Username));
            if (user == null)
            {
                return BadRequest();
            }
            else if (!VerifyPassword(model.Password, user.HashedPassword))
            {
                return BadRequest();
            }
            var token = GenerateJwtToken(user);
            return Ok(new AuthenticateResponse { Id = user.Id, Username = user.Username, Token = token });
        }

        // helper methods
        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        private static bool VerifyPassword(string requestPassword, string storedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(requestPassword, storedPassword);
        }
    }
}
