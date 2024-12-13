using GATES.API.Helper;
using GATES.API.Model;
using GATES.DA;
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
					OwnerId = User.Id(),
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
			try
			{
                var result = daInventory.GetList(User.Id());

                return Ok(result.Result);
            }
			catch (Exception ex) {
                return new JsonResult(new { Result = new { }, Message = ex.Message });
            }
		}

        [HttpPut]
        [Route("update")]
        public JsonResult Update(blUpdateInventory request)
		{
            try
            {
                var result = daInventory.Set(new daUpdateInventory()
				{
                    InventoryId = request.InventoryId,
					InventoryName = request.InventoryName,
					Description = request.Description,
					OwnerId = User.Id(),
                });

                return new JsonResult(result);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpDelete]
		[Route("delete")]
		public JsonResult Delete(string inventoryId)
		{
			try
			{
                var result = daInventory.Delete(inventoryId, User.Id());
                return new JsonResult(result);

            }
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
				return new JsonResult(new {Result = false, Message = ex.Message});
			}
		}

		[HttpPost]
		[Route("give-access")]
		public JsonResult GiveAccess(string email, string InventoryId)
		{
            try
            {
                var result = daInventory.GiveAccessTo(email, InventoryId, User.Id());
				return new JsonResult(result);

			}
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
				return new JsonResult(new { Result = false, Message = ex.Message });
			}
		}

        [HttpGet]
		[Route("get-access")]
		public JsonResult GetAccess(string inventoryId)
		{
            try
            {
                var result = daInventory.GetListAccess(inventoryId);
                return new JsonResult(result);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpDelete]
		[Route("remove-access")]
		public JsonResult DeleteAcces(string inventoryId, string email)
		{
            try
            {
                var result = daInventory.RemoveAccess(inventoryId, User.Id(), email);
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
