using System.Net;

namespace GATES.API.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class Middleware1
    {
        private readonly RequestDelegate _next;

        public Middleware1(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                List<string> notIncludeRoute = new()
                {
                    "/user/login", "/user/registration"
                };

                string route = httpContext.Request.Path.ToString().ToLower();

                if (!notIncludeRoute.Contains(route))
                {
                    bool islogged = httpContext.User.Identity?.IsAuthenticated ?? false;
                    if (!islogged)
                    {
                        httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return;
                    }
                }

                await _next(httpContext);
            }
            catch(Exception ex)
			{
                Console.WriteLine();
				Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(ex.Message);
                Console.ResetColor();
                return;
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<Middleware1>();
        }
    }
}
