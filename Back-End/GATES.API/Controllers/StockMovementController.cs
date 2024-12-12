using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GATES.DA;
using static Azure.Core.HttpHeader;

namespace GATES.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockMovementController(IStockMovementDA stockMovement) : ControllerBase
    {
        IStockMovementDA daStockMovement = stockMovement;

        [HttpPost]
        [Route("create")]
        public JsonResult Create(blInsertStockMovement request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Result = false, Message = "Required fields!" });
                }

                var result = daStockMovement.Insert(new daInsertStockMovement()
                {
                    MovementId = request.MovementId,
                    ProductId = request.ProductId,
                    MovementType = request.MovementType,
                    Quantity = request.Quantity,
                    ReferenceNo = request.ReferenceNo,
                    Notes = request.Notes,
                    Status = request.Status,
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
        public JsonResult Read(string productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Result = false, Message = "Required fields!" });
                }

                var result = daStockMovement.GetList(productId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("get")]
        public JsonResult Get(string productId, string movementId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Result = false, Message = "Required fields!" });
                }

                var result = daStockMovement.GetStockMovement(productId, movementId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpPut]
        [Route("update")]
        public JsonResult Update(blUpdateStockMovement request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Result = false, Message = "Required fields!" });
                }

                var result = daStockMovement.Set(new daUpdateStockMovement()
                {
                    MovementId = request.MovementId,
                    ProductId = request.ProductId,
                    MovementType = request.MovementType,
                    Quantity = request.Quantity,
                    ReferenceNo = request.ReferenceNo,
                    Notes = request.Notes,
                    Status = request.Status
                });

                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("delete")]
        public JsonResult Delete(string movementId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Result = false, Message = "Required fields!" });
                }

                var result = daStockMovement.Delete(movementId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }
        }
    }
}
