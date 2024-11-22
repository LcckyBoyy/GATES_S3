using GATES.API.Model;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GATES.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class InventoryController(IInventoryDA inventoryDA) : ControllerBase
	{
		private readonly IInventoryDA daInventory = inventoryDA;

		[HttpPost]
		[Route("create")]
		public JsonResult Create(blCreateInventory request)
		{
			try
			{
				var result = daInventory.Insert(new daCreateInventory()
				{
					InventoryId = request.InventoryId,
					InventoryName = request.InventoryName,
					Description = request.Description,
					OwnerId = request.OwnerId,
				});

				return new JsonResult(result);
			}
			catch (Exception ex)
			{
				return new JsonResult(new { Result = false, Message = ex.Message });
			}
		}


		[HttpGet]
		[Route("read")]
		public IActionResult Read()
		{
			var response = daInventory.GetList();

			return Ok(response);
		}


	}
}
