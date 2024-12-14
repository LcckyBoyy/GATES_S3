using GATES.DA.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using GATES.API.Model;
using GATES.API.Helper;
using GATES.DA;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Azure.Core;
using Microsoft.AspNetCore.Http.HttpResults;

namespace GATES.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController(IProductDA productDA, IHelperDA helperDa) : ControllerBase
    {
        IProductDA daProduct = productDA;
        IHelperDA daHelper = helperDa;

        [HttpPost]
        public JsonResult Create(blCreateProduct request)
        {
            try
            {
                var check = daHelper.CheckAccess(User.Id(), request.InventoryId);
                if (!check) return new JsonResult(new { Result = false, Message = "You dont have the access for this inventory" }); 

                var result = daProduct.Insert(new daInsertProduct()
                {
                    ProductId = request.ProductId,
                    ProductName = request.ProductName,
                    CategoryId = request.CategoryId,
                    SupplierId = request.SupplierId,
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
        public JsonResult Read(string inventoryId, string? productName)
        {
            try
            {
                var check = daHelper.CheckAccess(User.Id(), inventoryId);
                if (!check) return new JsonResult(new { Result = new { }, Message = "You dont have the access for this inventory" });

                var result = daProduct.GetList(inventoryId, productName);
                return new JsonResult(result.Result);
            }
            catch(Exception ex)
            {
                return new JsonResult(new { Result = new { }, Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("get")]
        public JsonResult Get(string inventoryId, string productId)
        {
            try
            {
                var check = daHelper.CheckAccess(User.Id(), inventoryId);
                if (!check) return new JsonResult(new { Result = new { }, Message = "You dont have the access for this inventory" });

                var result = daProduct.GetProduct(inventoryId, productId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpPut]
        public JsonResult Update(blUpdateProduct request)
        {
            try
            {
                var check = daHelper.CheckAccess(User.Id(), request.InventoryId);
                if (!check) return new JsonResult(new { Result = new { }, Message = "You dont have the access for this inventory" });

                var result = daProduct.Set(new daUpdateProduct()
                {
                    InventoryId = request.InventoryId,
                    ProductId = request.ProductId,
                    CategoryId = request.CategoryId,
                    SupplierId = request.SupplierId,
                    ProductName = request.ProductName,
                    Description = request.Description,
                    Sku = request.Sku,
                    UnitPrice = request.UnitPrice,
                    CurrentStock = request.CurrentStock,
                    MinimumStock = request.MinimumStock,
                    UnitMeasure = request.UnitMeasure,
                });

                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpDelete]
        public JsonResult Delete(string inventoryId, string productId)
        {
            try
            {
                var check = daHelper.CheckAccess(User.Id(), inventoryId);
                if (!check) return new JsonResult(new { Result = new { }, Message = "You dont have the access for this inventory" });

                var result = daProduct.Remove(productId, inventoryId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }
    }
}
