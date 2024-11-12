using Microsoft.AspNetCore.Mvc;
using GATES.DB.DB;
using GATES.Models;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Net;

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
				bool response = daUser.Registration(new daRegistrationUser
				{
					Email = req.Email,
					UserId = req.UserId,
					Username = req.Username,
					PasswordSalt = req.PasswordSalt,
				});
                
                return new JsonResult(response);
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
            var response = daUser.Login(username, password);

            if (response.Result != null)
            {
                var claim = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, response.Result.UserId),
                    new Claim(ClaimTypes.Name, response.Result.Username),
                    new Claim(ClaimTypes.Email, response.Result.Email),
                };

                var claimsIdentity = new ClaimsIdentity(claim, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = rememberMe
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
                
                return new JsonResult(new { Message = "Success", Result = true });
            }
            else
            {
                return new JsonResult( new { Message = "Failed", Result = false });
            }
        }

        [HttpGet]
        [Route("getlist")]
        public IActionResult GetList()
        {
            try
            {
                var list = daUser.GetList();
                return new JsonResult(list);
            }
            catch (Exception ex)
            {
                Console.BackgroundColor = ConsoleColor.Blue;
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine(ex.Message);
                Console.ResetColor();
                return new JsonResult(false);
            }
        }

    }
}
