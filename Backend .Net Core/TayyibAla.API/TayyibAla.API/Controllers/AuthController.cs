using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TayyibAla.API.Data;
using TayyibAla.API.Dtos;
using TayyibAla.API.Models;

namespace TayyibAla.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepo _authRepository;
        private IConfiguration _configuration;
        public AuthController(IAuthRepo authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if (await _authRepository.UserExists(userForRegisterDto.e_mail))
            {
                ModelState.AddModelError("UserName", "Username already exists");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userToCreate = new Customer
            {
                e_mail = userForRegisterDto.e_mail,
                firstname = userForRegisterDto.firstname,
                lastname = userForRegisterDto.lastname
            };

            var createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody]UserForLoginDto userForLoginDto)
        {
            var user = await _authRepository.Login(userForLoginDto.e_mail, userForLoginDto.password);
            if (user == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier,user.id.ToString()),
                    new Claim(ClaimTypes.Name,user.e_mail)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);




            dynamic data = new ExpandoObject();
            data.token = tokenString;

            // convert to JSON
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(data);

            Response.Headers.Add("Content-Type", "application/json");

            return Ok(json);
        }

        [HttpGet("{e_mail}")]
        public async Task<ActionResult> GetCurrentUser(string e_mail)
        {
            var customer = await _authRepository.GetCurrentCustomer(e_mail);
            if (customer == null)
            {
                return Unauthorized();
            }
            return Ok(customer);
        }
    }
}