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
				var entity = (from i in server.MtSuppliers
							  where i.SupplierName == req.SupplierName
							  select i).FirstOrDefault();

				if (entity != null) { response.Message = "Supplier exist"; return response; }

				MtSupplier a = new()
				{
					SupplierId = DateTime.UtcNow.ToString(),
					
					SupplierName = req.SupplierName,
					IsActive = true,
				};

				server.MtSuppliers.Add(new MtSupplier()
                {
                    SupplierId = DateTime.UtcNow.ToString(),
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
	}
}
