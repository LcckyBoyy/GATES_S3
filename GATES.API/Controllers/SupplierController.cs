using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Mvc;
using GATES.API.Model;
using Microsoft.AspNetCore.Authorization;

namespace GATES.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class SupplierController(ISupplierDA supplierDA) : ControllerBase
	{
		ISupplierDA daSupplier = supplierDA;

		[HttpPost]
		[Route("insert")]
		public IActionResult Create(blCreateSupplier request)
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
	}
}
