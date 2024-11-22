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
		public BaseResponse<bool> Insert(daCreateInventory req);
		public BaseResponse<List<daGetlistInventory>> GetList();
	}
}
