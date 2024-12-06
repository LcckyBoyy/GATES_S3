using GATES.DA.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using GATES.API.Model;
using GATES.API.Helper;

namespace GATES.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController(IProductDA productDA) : ControllerBase
    {
        IProductDA daProduct = productDA;

        [HttpPost]
        public JsonResult Create(blCreateProduct request)
        {
            try
            {
                var result = daProduct.Insert(new daInsertProduct()
                {
                    ProductId = request.ProductId,
                    ProductName = request.ProductName,
                    CategoryId = request.CategoryId,
                    InventoryId = request.InventoryId,
                    Description = request.Description,
                    CurrentStock = request.CurrentStock,
                    MinimumStock = request.MinimumStock,
                    UnitPrice = request.UnitPrice,
                    Sku = request.Sku,
                    UnitMeasure = request.UnitMeasure,
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
        public JsonResult Read(string inventoryId)
        {
            try
            {
                var result = daProduct.GetList(User.Id(), inventoryId);
                return new JsonResult(result);
            }
            catch(Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }
    }
}
