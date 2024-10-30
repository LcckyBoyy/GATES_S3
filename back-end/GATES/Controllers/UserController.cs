using Microsoft.AspNetCore.Mvc;
using GATES.DB.DB;
using GATES.Models;

namespace GATES.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("registration")]
        public JsonResult Registration(UserRegistration req)
        {
            using (var server = new GatesContext())
            {
                var entity = (from i in server.MtUsers
                             where i.Username == req.Username
                            select i).FirstOrDefault();

                if(entity != null)
                {
                    return new JsonResult("Username exist!");
                }

                MtUser a = new()
                {
                    UserId = req.UserId,
                    Username = req.Username,
                    Email = req.Email,
                    PasswordSalt = req.PasswordSalt,

                    CreatedAt = DateTime.UtcNow,
                    LastLogin = DateTime.UtcNow,
                    IsActive = true,
                };

                server.MtUsers.Add(a);
                server.SaveChanges();

                return new JsonResult("Success");
            }
        }

        [HttpPost]
        [Route("addInventory")]
        public JsonResult AddInventory(string id, string description)
        {
            using (var server = new GatesContext())
            {
                var entity = (from i in server.MtUsers
                              where i.UserId == id
                              select i).FirstOrDefault();

                if (entity == null)
                {
                    return new JsonResult("Username doesn't exist!");
                }

                string formattedString = string.Format("INVTRY{0:D5}", entity.UserId);

                var inventory = (from i in server.PInventories
                                where i.InventoryId == formattedString
                                select i).FirstOrDefault();

                if (inventory != null)
                {
                    return new JsonResult("Inventory exist!");
                }

                PInventory a = new()
                {
                    InventoryId = formattedString,
                    InventoryName = "Bank Fert",
                    OwnerId = entity.UserId,
                    Description = description,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                };

                server.PInventories.Add(a);
                server.SaveChanges();

                return new JsonResult("Success");
            }
        }

        [HttpPost]
        [Route("addInventoryAccess")]
        public JsonResult AddInventoryAccess(string userId, string inventoryId)
        {
            using (var server = new GatesContext())
            {
                try
                {
                    PInventoryAccess a = new()
                    {
                        InventoryId = inventoryId,
                        UserId = userId,
                        InventoryAccesId = string.Format("INVACSS{0:D30}", DateTime.UtcNow.ToString("yyMMddHHmmssfff") ),
                        GrantedAt = DateTime.UtcNow,
                        IsActive = true
                    };
                    server.Add(a);
                    server.SaveChanges();
                }
                catch(Exception e)
                {
                    return new JsonResult(e.Message);
                }

                return new JsonResult("Success");
            }
        }
    }
}
