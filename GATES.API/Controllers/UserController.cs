using Microsoft.AspNetCore.Mvc;
using GATES.Models;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using GATES.API.Helper;

namespace GATES.Controllers
{
	[Authorize]
	[ApiController]
    [Route("[controller]")]
    public class UserController(IUsersDA usersDA) : ControllerBase
    {
        private readonly IUsersDA daUser = usersDA;

        [HttpPost]
        [Route("registration")]
        [AllowAnonymous]
        public JsonResult Registration(blRegistrationUser req)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(false);
            }

            try
            {
				var result = daUser.Registration(new daRegistrationUser
				{
					Email = req.Email,
					UserId = req.UserId,
					Username = req.Username,
					PasswordSalt = req.PasswordSalt,
				});
                
                return new JsonResult(result);
			}
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult(false);
			}
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<JsonResult> Login(string username, string password, bool rememberMe)
        {
            var result = daUser.Login(username, password);

            if (result.Result != null)
            {
                var claim = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, result.Result.UserId),
                    new Claim(ClaimTypes.Name, result.Result.Username),
                    new Claim(ClaimTypes.Email, result.Result.Email),
                };

                var claimsIdentity = new ClaimsIdentity(claim, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = rememberMe
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
                
                return new JsonResult(new { Message = result.Message, Result = true });
            }
            else
            {
                return new JsonResult( new { Message = result.Message, Result = false });
            }
        }

		[HttpPost]
		[Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
		
        [HttpGet]
        [Route("pingauth")]
        public JsonResult PingAuth()
        {
            return new JsonResult( new{ Username = User.Name(), Email = User.Email() });
        }
    }
}
