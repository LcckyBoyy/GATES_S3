using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.API.Model;
using Microsoft.AspNetCore.Mvc;

namespace GATES.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockMovementController(IStockMovementDA stockMovement) : ControllerBase
    {
        IStockMovementDA daStockMovement = stockMovement;

        [HttpPost]
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
                    MovementDate = request.MovementDate,
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
                    MovementDate = request.MovementDate,
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
