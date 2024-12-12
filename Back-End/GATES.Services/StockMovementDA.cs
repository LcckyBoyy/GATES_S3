using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
    public class StockMovementDA : IStockMovementDA
    {
        public BaseResponse<bool> Insert(daInsertStockMovement req)
        {
            var response = new BaseResponse<bool>();

            using (GatesContext server = new())
            {
                var product = (from i in server.PProducts
                          where i.ProductId == req.ProductId
                          select i).FirstOrDefault();

                if (product == null)
                {
                    response.Message = "Product not found";
                    return response;
                }

                if (req.MovementType == HelperDA.MOVEMENT_TYPE_IN) product.CurrentStock = product.CurrentStock + req.Quantity;
                else if(req.MovementType == HelperDA.MOVEMENT_TYPE_OUT) product.CurrentStock = product.CurrentStock - req.Quantity;
                product.UpdatedAt = DateTime.UtcNow;

                server.PStockMovements.Add(new PStockMovement()
                {
                    MovementId = req.MovementId,
                    ProductId = req.ProductId,
                    MovementType = req.MovementType,
                    Quantity = req.Quantity,
                    ReferenceNo = req.ReferenceNo,
                    MovementDate = DateTime.UtcNow,
                    Notes = req.Notes,
                    Status = req.Status,
                });

                server.SaveChanges();
                
                response.Result = true;
                response.Message = "Success";
            }

            return response;
        }
        
        public BaseResponse<List<daGetListStockMovement>> GetList(string productId)
        {
            var response = new BaseResponse<List<daGetListStockMovement>>();
            using (GatesContext server = new())
            {
                var db = from i in server.PStockMovements
                         where i.ProductId == productId
                         select new daGetListStockMovement
                         {
                             MovementId = i.MovementId,
                             ProductId = i.ProductId,
                             MovementType = i.MovementType,
                             Quantity = i.Quantity,
                             ReferenceNo = i.ReferenceNo,
                             Notes = i.Notes,
                             Status = i.Status,
                         };

                response.Result = db.ToList();
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<daUpdateStockMovement> GetStockMovement(string productId, string movementId)
        {
            var response = new BaseResponse<daUpdateStockMovement>();
            using (GatesContext server = new())
            {
                var movement = (from i in server.PStockMovements
                                where i.MovementId == movementId && i.ProductId == productId
                                select i).FirstOrDefault();
                if (movement == null)
                {
                    response.Message = "Movement not found";
                    return response;
                }

                response.Result = new daUpdateStockMovement()
                {
                    MovementId = movement.MovementId, 
                    ProductId = movement.ProductId, 
                    MovementType = movement.MovementType, 
                    Quantity = movement.Quantity, 
                    ReferenceNo = movement.ReferenceNo, 
                    Notes = movement.Notes, 
                    Status = movement.Status
                };
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<bool> Set(daUpdateStockMovement req)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {   
                var movement = (from i in server.PStockMovements
                                where i.MovementId == req.MovementId
                                select i).FirstOrDefault();
                if (movement == null)
                {
                    response.Message = "Movement not found";
                    return response;
                }

                var product = (from i in server.PProducts
                               where i.ProductId == req.ProductId
                               select i).FirstOrDefault();
                if (product == null) 
                {
                    response.Message = "Product not found";
                    return response;
                }

                if (movement.Quantity != req.Quantity)
                {
                    if (movement.MovementType != req.MovementType)
                    {
                        if (req.MovementType == HelperDA.MOVEMENT_TYPE_IN) 
                            product.CurrentStock = (product.CurrentStock + movement.Quantity) + req.Quantity;

                        else if (req.MovementType == HelperDA.MOVEMENT_TYPE_OUT) 
                            product.CurrentStock = (product.CurrentStock - movement.Quantity) - req.Quantity;
                    }
                    else
                    {
                        if (movement.MovementType == HelperDA.MOVEMENT_TYPE_IN)
                            product.CurrentStock = (product.CurrentStock - movement.Quantity) + req.Quantity;

                        else if (movement.MovementType == HelperDA.MOVEMENT_TYPE_OUT) 
                            product.CurrentStock = (product.CurrentStock + movement.Quantity) - req.Quantity;
                    }
                }
                else if (req.MovementType != movement.MovementType)
                {
                    if (req.MovementType == HelperDA.MOVEMENT_TYPE_IN) 
                        product.CurrentStock = product.CurrentStock + movement.Quantity + movement.Quantity;

                    else if (req.MovementType == HelperDA.MOVEMENT_TYPE_OUT)
                        product.CurrentStock = product.CurrentStock - movement.Quantity - movement.Quantity;
                }

                movement.MovementId = req.MovementId;
                movement.ProductId = req.ProductId;
                movement.MovementType = req.MovementType;
                movement.Quantity = req.Quantity;
                movement.ReferenceNo = req.ReferenceNo;
                //movement.MovementDate = DateTime.UtcNow;
                movement.Notes = req.Notes;
                movement.Status = req.Status;

                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";

            }
            return response;
        }

        public BaseResponse<bool> Delete(string movementId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var movement = (from i in server.PStockMovements
                          where i.MovementId == movementId
                          select i).FirstOrDefault();

                if (movement == null)
                {
                    response.Message = "Movement not found!";
                    return response;
                }

                var product = (from i in server.PProducts
                               where i.ProductId == movement.ProductId
                               select i).FirstOrDefault();

                if (product == null)
                {
                    response.Message = "Product not found!";
                    return response;
                }

                if (movement.MovementType == HelperDA.MOVEMENT_TYPE_IN) product.CurrentStock = product.CurrentStock - movement.Quantity;
                else if (movement.MovementType == HelperDA.MOVEMENT_TYPE_OUT) product.CurrentStock = product.CurrentStock + movement.Quantity;

                server.PStockMovements.Remove(movement);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }

            return response;
        }
    }
}
