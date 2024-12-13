﻿using GATES.DA.Interface;
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

		public BaseResponse<List<daGetlistInventory>> GetList(string id)
		{
			var response = new BaseResponse<List<daGetlistInventory>>();

			using (GatesContext server = new())
			{
				var acces = server.PInventoryAccesses
					.Where(i => i.UserId.Contains(id))
					.Select(i => i.InventoryId)
					.ToList();

				var db = server.PInventories.Where(i => acces.Contains(i.InventoryId) && i.IsActive == true).Select(i => new daGetlistInventory
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
	
        public BaseResponse<bool> Set(daUpdateInventory req)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var db = (from i in server.PInventories
                          where i.InventoryId == req.InventoryId && i.IsActive == true
                          select i).FirstOrDefault();
                if (db == null)
                {
                    response.Message = "Inventory not found!";
                    return response;
                }
                if (db.OwnerId != req.OwnerId)
                {
                    response.Message = "Only the owner of this inventory can edit";
                    return response;
                }

                db.InventoryName = req.InventoryName;
                db.Description = req.Description;
             
                server.SaveChanges();
                response.Result = true;response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<bool> Delete(string inventoryId, string ownerId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var inventory = server.PInventories.Where(i => i.InventoryId == inventoryId && i.OwnerId == ownerId).FirstOrDefault();

                if (inventory == null)
                {
                    response.Message = "Only the owner of this inventory can delete it!";
                    return response;
                }

                var acces = server.PInventoryAccesses.Where(i => i.InventoryId == inventoryId).ToList();

                foreach (var i in acces)
                {
                    server.PInventoryAccesses.Remove(i);
                }

                server.PInventories.Remove(inventory);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Sucess";
            }
            return response;
        }
       
        public BaseResponse<bool> GiveAccessTo(string email, string InventoryId, string ownerId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var inventory = server.PInventories.Where(i => i.InventoryId == InventoryId).FirstOrDefault();

                if (inventory == null)
                {
                    response.Message = "Inventory doesn't exist!";
                    return response;
                }
                if (inventory.OwnerId != ownerId)
                {
                    response.Message = "Only the owner of this inventory can give the access!";
                    return response;
                }



                string? user = (from i in server.MtUsers
                                where i.Email == email
                                select i.UserId).FirstOrDefault();

                if (string.IsNullOrEmpty(user))
                {
                    response.Message = "User not found.";
                    return response;
                }

                server.PInventoryAccesses.Add(new PInventoryAccess
                {
                    InventoryAccesId = DateTime.UtcNow.ToString(),
                    UserId = user ?? "",
                    InventoryId = InventoryId,
                    GrantedAt = DateTime.UtcNow,
                    ExpiredAt = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                });
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<List<daGetListAccess>> GetListAccess(string inventoryId)
        {
            var response = new BaseResponse<List<daGetListAccess>>();
            using (GatesContext server = new GatesContext())
            {
                var db = (from i in server.PInventoryAccesses
                          where i.InventoryId == inventoryId
                          select new daGetListAccess

                          {
                              Username = i.User.Username,
                              Email = i.User.Email,

                          });

                response.Result = db.ToList();
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<bool> RemoveAccess(string inventoryId, string ownerId, string userId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new GatesContext())
            {
                var db = (from i in server.PInventoryAccesses
                          where i.InventoryId == inventoryId
                          && i.UserId == userId
                          select i).FirstOrDefault();

                if (db == null)
                {
                    response.Message = "Access not found";
                    return response;
                }

                if (db.Inventory.OwnerId != ownerId)
                {
                    response.Message = "Access not found";
                    return response;
                }
                server.PInventoryAccesses.Remove(db);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }

            return response;
        }
    }
}
