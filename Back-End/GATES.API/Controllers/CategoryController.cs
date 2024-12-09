using GATES.API.Model;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GATES.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController(ICategoryDA cateogryDa) : ControllerBase
    {
        ICategoryDA daCategory = cateogryDa;

        [HttpPost]
        [Route("create")]
        public JsonResult Create(blCreateCategory req)
        {
            try
            {
                var result = daCategory.Insert(new daInsertCategory()
                {
                    CategoryId = req.CategoryId,
                    Name = req.Name,
                    Description = req.Description 

                });

                return new JsonResult(result);

            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message }); 
            }

        }

        [HttpGet]
        [Route("read")]
        public JsonResult Read()
        {
            var result = daCategory.GetList();
            return new JsonResult(result.Result);
        }

        [HttpPut]
        [Route("update")]
        public JsonResult Update(blUpdateCategory req)
        {
            var result = daCategory.Set(new daUpdateCategory()
            {
                CategoryId = req.CategoryId,
                Name = req.Name,
                Description = req.Description
            });

            return new JsonResult(result);
        }

        [HttpDelete]
        [Route("delete")]
        public JsonResult Delete(string categoryId)
        {
            var result = daCategory.Remove(categoryId);
            return new JsonResult(result);
        }
    }
}
