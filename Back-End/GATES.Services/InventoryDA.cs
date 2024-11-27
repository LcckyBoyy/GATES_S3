using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
	public class InventoryDA : IInventoryDA
	{
		public BaseResponse<bool> Insert(daInsertInventory req)
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
				response.Message = "Success";
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
	
		public BaseResponse<bool> Delete(string id)
		{
			var response = new BaseResponse<bool>();
			using (GatesContext server = new())
			{
				var db = server.PInventories.Where(i => i.InventoryId == id).FirstOrDefault();

				if (db == null)
				{
					response.Message = "Invalid id!";
					return response;
				}

				server.PInventories.Remove(db);
				server.SaveChanges();

				response.Result = true;
				response.Message = "Sucess";
			}
			return response;
		}

		public BaseResponse<bool> GiveAccessTo(string userId, string InventoryId)
		{
			var response = new BaseResponse<bool>();
			using (GatesContext server = new())
			{
				var db = server.PInventories.Where(i => i.InventoryId == InventoryId)
					.Join(server.MtUsers, i => i.OwnerId, j => j.UserId,
					(x, y) => new { x.InventoryId, y.UserId }).FirstOrDefault();

				if (db == null)
				{
					response.Message = "Inventory doesn't exist!";
					return response;
				}

				server.PInventoryAccesses.Add(new PInventoryAccess
				{
                    InventoryAccesId = DateTime.UtcNow.ToString(),
                    InventoryId = InventoryId,
                    ExpiredAt = DateTime.UtcNow.AddDays(30),
                    GrantedAt = DateTime.UtcNow,
                    IsActive = true,
                    UserId = userId
                });
				server.SaveChanges();
				response.Result = true;
				response.Message = "Success";
			}
			return response;
		}

	}
}
