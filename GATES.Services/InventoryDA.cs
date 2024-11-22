using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
	public class InventoryDA : IInventoryDA
	{
		public BaseResponse<bool> Insert(daCreateInventory req)
		{
			var response = new BaseResponse<bool>();
			using (GatesContext server = new())
			{
				var db = server.PInventories.Where(i => i.InventoryName == req.InventoryName).FirstOrDefault();
				if (db != null)
				{
					response.Message = "Inventory name exist!";
					return response;
				}

				//PInventory newInvent = new()
				//{
				//	InventoryId = DateTime.UtcNow.ToString(),
				//	InventoryName = req.InventoryName,
				//	CreatedAt = DateTime.UtcNow,
				//	Description = req.Description,
				//	IsActive = true,
				//	OwnerId = req.OwnerId,
				//};

				server.PInventories.Add(new PInventory
				{
					InventoryId = req.InventoryId,
					InventoryName = req.InventoryName,
					CreatedAt = DateTime.UtcNow,
					Description = req.Description,
					IsActive = true,
					OwnerId = req.OwnerId,
				});

				server.PInventoryAccesses.Add(new PInventoryAccess
				{
					InventoryAccesId = DateTime.UtcNow.ToString(),
					InventoryId = req.InventoryId,
					ExpiredAt = DateTime.UtcNow.AddDays(30),
					GrantedAt = DateTime.UtcNow,
					IsActive = true,
					UserId = req.OwnerId
				});

				server.SaveChanges();

				response.Result = true;
				response.Message = "Succes";
			}
			return response;
		}

		public BaseResponse<List<daGetlistInventory>> GetList()
		{
			var response = new BaseResponse<List<daGetlistInventory>>();

			using (GatesContext server = new())
			{
				var db = server.PInventories.Select(i => new daGetlistInventory
				{
					 InventoryId = i.InventoryId,
					 Description = i.Description,
					 InventoryName = i.InventoryName,
					 OwnerId = i.OwnerId
				}).ToList();
				response.Result = db;
			}
			return response;
		}
	}
}
