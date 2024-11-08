using GATES.DA.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GATES.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class InventoryController(IInventoryDA inventoryDA) : ControllerBase
	{
		private readonly IInventoryDA daInventory = inventoryDA;

		[HttpGet]
		[Route("getlist")]
		public IActionResult Get()
		{
			var response = daInventory.GetList();
			return Ok(response);
		}


	}
}
