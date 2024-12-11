using GATES.DA.Interface;
using GATES.DA;
using Microsoft.AspNetCore.Authentication.Cookies;
using GATES.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ConfigureService(builder.Configuration, builder.Services);

var app = builder.Build();


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<Middleware1>();
app.MapControllers();

app.Run();

void ConfigureService(ConfigurationManager config, IServiceCollection services)
{
	services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
		.AddCookie(options =>
		{
			options.ExpireTimeSpan = TimeSpan.FromHours(720);
			options.SlidingExpiration = true;
			options.AccessDeniedPath = "/Forbiden";
			options.Cookie.Name = "Users.Cookie";
			options.LoginPath = "/account";
        });

	services.AddTransient<IUsersDA, UsersDA>();
	services.AddTransient<ISupplierDA, SupplierDA>();
	services.AddTransient<IInventoryDA, InventoryDA>(); 
	services.AddTransient<IProductDA, ProductDA>();
	services.AddTransient<ICategoryDA, CategoryDA>();
	services.AddTransient<IHelperDA, HelperDA>();
}