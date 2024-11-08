using Microsoft.AspNetCore.Mvc;
using GATES.DB.DB;
using GATES.Models;

using GATES.DA.Interface;
using GATES.DA;
using GATES.DA.ServicesModel;

namespace GATES.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(IUsersDA usersDA) : ControllerBase
    {
        private readonly IUsersDA daUser = usersDA;

        [HttpPost]
        [Route("registration")]
        public JsonResult Registration(blRegistrationUser req)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(false);
            }

            try
            {
				bool response = daUser.Registration(new daRegistrationUser()
				{
					Email = req.Email,
					UserId = req.UserId,
					Username = req.Username,
					PasswordSalt = req.PasswordSalt,
				});
                
                return new JsonResult(response);
			}
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JsonResult(false);
			}
        }

        [HttpGet]
        [Route("getlist")]
		public JsonResult GetList()
        {
            try
            {
                var list = daUser.GetList();
                return new JsonResult(list);
			}
            catch(Exception ex) 
            {
                Console.BackgroundColor = ConsoleColor.Blue;
                Console.ForegroundColor = ConsoleColor.White;
				Console.WriteLine(ex.Message);
				Console.ResetColor();
                return new JsonResult(false);
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
