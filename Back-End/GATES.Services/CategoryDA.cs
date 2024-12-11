using GATES.DA.ServicesModel;
using GATES.DB.DB;
using GATES.DA.Interface;

namespace GATES.DA
{
    public class CategoryDA : ICategoryDA
    {
        public BaseResponse<bool> Insert(daInsertCategory req)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server= new())
            {
                var db = (from i in server.PCategories
                         where i.Name == req.Name && i.InventoryId == req.InventoryId
                       select i).FirstOrDefault();

                if (db != null)
                {
                    response.Message = "Category already exist";
                    return response;
                }

                server.PCategories.Add(new PCategory()
                {
                    CategoryId = req.CategoryId,
                    InventoryId = req.InventoryId,
                    Name = req.Name,
                    Description = req.Description
                });
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<List<daGetListCategory>> GetList(string inventoryId)
        {
            var response = new BaseResponse<List<daGetListCategory>>();
            using (GatesContext server= new())
            {
                var db = from i in server.PCategories
                         where i.InventoryId == inventoryId
                         select new daGetListCategory
                         {
                             CategoryId = i.CategoryId,
                             InventoryId = i.InventoryId,
                             Name = i.Name,
                             Description = i.Description
                         };

                response.Result = db.ToList();
            }

            return response;
        }

        public BaseResponse<daUpdateCategory> GetCategory(string categoryId, string inventoryId)
        {
            var response = new BaseResponse<daUpdateCategory>();
            using (GatesContext server = new())
            {
                var cateogry = (from i in server.PCategories
                          where i.CategoryId == categoryId && i.InventoryId == inventoryId
                          select i).FirstOrDefault();

                if (cateogry == null)
                {
                    response.Message = "Category not found!";
                    return response;
                }

                response.Result = new daUpdateCategory()
                {
                    CategoryId = cateogry.CategoryId,
                    InventoryId = cateogry.InventoryId,
                    Description = cateogry.Description,
                    Name = cateogry.Name,
                };
                response.Message = "Success";
            }

            return response;
        }

        public BaseResponse<bool> Set(daUpdateCategory req)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server= new())
            {
                var db = (from i in server.PCategories
                         where i.CategoryId == req.CategoryId && i.InventoryId == req.InventoryId
                       select i).FirstOrDefault();

                if (db == null)
                {
                    response.Message = "Category not found";
                    return response;
                }

                db.Name = req.Name;
                db.Description = req.Description;

                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }
       
        public BaseResponse<bool> Remove(string categoryId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var db = (from i in server.PCategories
                          where i.CategoryId == categoryId
                          select i).FirstOrDefault();

                if (db == null)
                {
                    response.Message = "Category doesn't exist!";
                    return response;
                }

                server.PCategories.Remove(db);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }
    }
}
