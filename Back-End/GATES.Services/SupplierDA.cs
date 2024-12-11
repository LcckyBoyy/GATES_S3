using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
	public class SupplierDA : ISupplierDA
	{
		public BaseResponse<bool> Insert(daInsertSupplier req)
		{
			var response = new BaseResponse<bool>();
			using (GatesContext server = new())
			{
				var entity = (from i in server.PSuppliers
							  where i.SupplierName == req.SupplierName && i.InventoryId == req.InventoryId
							  select i).FirstOrDefault();

				if (entity != null) { response.Message = "Supplier exist"; return response; }

				server.PSuppliers.Add(new PSupplier()
                {
                    SupplierId = req.SupplierId,
                    InventoryId = req.InventoryId,
                    SupplierName = req.SupplierName,
					ContactPerson = req.ContactPerson,
					Email = req.Email,
					Phone = req.Phone,
					Address = req.Address,
                    IsActive = true,
                });

				server.SaveChanges();

				response.Result = true;
				response.Message = "Success";
				return response;
			}
		}
        
		public BaseResponse<List<daGetListSupplier>> GetList(string inventoryId)
        {
            var response = new BaseResponse<List<daGetListSupplier>>();

            using (GatesContext server = new())
            {
                var db = (from i in server.PSuppliers
                          where i.IsActive == true && i.InventoryId == inventoryId
                          select new daGetListSupplier
                          {
                              SupplierId = i.SupplierId,
                              SupplierName = i.SupplierName,
                              ContactPerson = i.ContactPerson,
                              Email = i.Email,
                              Phone = i.Phone,
                              Address = i.Address,
                          });
                response.Result = [.. db];
                response.Message = "Success";
            }

            return response;
        }
        
		public BaseResponse<bool> Remove(string supplierId)
		{
			var response = new BaseResponse<bool>();
			using (GatesContext server = new())
			{
				var db = (from i in server.PSuppliers
						  where i.SupplierId == supplierId && i.IsActive == true
                          select i).FirstOrDefault();

				if (db == null)
				{
					response.Message = "Supplier not found!";
					return response;
				}

				server.PSuppliers.Remove(db);
				server.SaveChanges(true);

				response.Result = true;
				response.Message = "Success";
			}

			return response;
		}
    }
}
