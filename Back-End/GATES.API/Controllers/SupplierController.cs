using GATES.API.Model;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GATES.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	public class SupplierController(ISupplierDA supplierDA) : ControllerBase
	{
		ISupplierDA daSupplier = supplierDA;

		[HttpPost]
		[Route("create")]
		public IActionResult Create(blCreateSupplier request)
		{
			try
			{
                var result = daSupplier.Insert(new daInsertSupplier
                {
                    SupplierName = request.SupplierName,
                    ContactPerson = request.ContactPerson,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address,
                });

                return new JsonResult(result);
            }
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return new JsonResult(new { Result = false, Message = ex.Message });
			}
			
		}
	}
}
