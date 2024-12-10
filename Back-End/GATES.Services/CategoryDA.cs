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
                var db = (from i in server.MtCategories
                         where i.Name == ""
                       select i).FirstOrDefault();

                if (db != null)
                {
                    response.Message = "Category already exist";
                    return response;
                }

                server.MtCategories.Add(new MtCategory()
                {
                    CategoryId = req.CategoryId,
                    Name = req.Name,
                    Description = req.Description
                });
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }

        public BaseResponse<List<daGetListCategory>> GetList()
        {
            var response = new BaseResponse<List<daGetListCategory>>();
            using (GatesContext server= new())
            {
                var db = from i in server.MtCategories
                         select new daGetListCategory
                         {
                             CategoryId = i.CategoryId,
                             Name = i.Name,
                             Description = i.Description
                         };

                response.Result = db.ToList();
            }

            return response;
        }

        public BaseResponse<daUpdateCategory> GetCategory(string categoryId)
        {
            var response = new BaseResponse<daUpdateCategory>();
            using (GatesContext server = new())
            {
                var cateogry = (from i in server.MtCategories
                          where i.CategoryId == categoryId
                          select i).FirstOrDefault();

                if (cateogry == null)
                {
                    response.Message = "Category not found!";
                    return response;
                }

                response.Result = new daUpdateCategory()
                {
                    CategoryId = cateogry.CategoryId,
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
                var db = (from i in server.MtCategories
                         where i.CategoryId == req.CategoryId
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
                var db = (from i in server.MtCategories
                          where i.CategoryId == categoryId
                          select i).FirstOrDefault();

                if (db == null)
                {
                    response.Message = "Category doesn't exist!";
                    return response;
                }

                server.MtCategories.Remove(db);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }
    }
}
