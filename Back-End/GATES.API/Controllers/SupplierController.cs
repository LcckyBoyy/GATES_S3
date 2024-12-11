using GATES.API.Model;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;
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
                    SupplierId = request.SupplierId,
                    InventoryId = request.InventoryId,
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

        [HttpGet]
        [Route("read")]
        public IActionResult Read(string inventoryId)
        {
            try
            {
                var result = daSupplier.GetList(inventoryId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult(new { Result = new {}, Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete")]
        public JsonResult Delete(string supplierId)
        {
            try
            {
                var result = daSupplier.Remove(supplierId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }
    }
}
