using GATES.API.Helper;
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
	public class InventoryController(IInventoryDA inventoryDA) : ControllerBase
	{
		private readonly IInventoryDA daInventory = inventoryDA;

		[HttpPost]
		[Route("create")]
		public JsonResult Create(blCreateInventory request)
		{
			try
			{
				var result = daInventory.Insert(new daInsertInventory()
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
			var result = daInventory.GetList(User.Id());

			return Ok(result);
		}

		[HttpPost]
		[Route("give-access")]
		public JsonResult GiveAccess(string email, string InventoryId)
		{
            try
            {
                var result = daInventory.GiveAccessTo(email, InventoryId);
				return new JsonResult(result);

			}
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
				return new JsonResult(new {Result = false, Message = ex.Message });
			}
		}


		[HttpDelete]
		[Route("delete")]
		public JsonResult Delete(string id)
		{
			try
			{
                var result = daInventory.Delete(id);
                return new JsonResult(result);

            }
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
				return new JsonResult(new {Result = false, Message = ex.Message});
			}
		}

    }
}
