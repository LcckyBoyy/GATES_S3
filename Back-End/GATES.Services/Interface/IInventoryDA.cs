using GATES.DA.ServicesModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.Interface
{
	public interface IInventoryDA
	{
		public BaseResponse<bool> Insert(daInsertInventory req);
		public BaseResponse<List<daGetlistInventory>> GetList(string id);
		public BaseResponse<bool> Set(daUpdateInventory req);
        public BaseResponse<bool> Delete(string id, string ownerId);
        public BaseResponse<bool> GiveAccessTo(string userId, string InventoryId, string ownerId);
        public BaseResponse<List<daGetListAccess>> GetListAccess(string inventoryId);
        public BaseResponse<bool> RemoveAccess(string inventoryId, string accessId);
    }
}
