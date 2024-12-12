using GATES.DA.ServicesModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.Interface
{
    public interface IStockMovementDA
    {
        public BaseResponse<bool> Insert(daInsertStockMovement req);
        public BaseResponse<List<daGetListStockMovement>> GetList(string productId);
        public BaseResponse<daUpdateStockMovement> GetStockMovement(string productId, string movementId);
        public BaseResponse<bool> Set(daUpdateStockMovement req);
        public BaseResponse<bool> Delete(string movementId);
    }
}
