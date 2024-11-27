using GATES.DA.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GATES.DA.ServicesModel;
using Microsoft.AspNetCore.Authorization;

namespace GATES.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController(IProductDA productDA) : ControllerBase
    {
        IProductDA daProduct = productDA;

        [HttpPost]
        public JsonResult Create()
        {
            try
            {
                var result = daProduct.Insert(new daInsertProduct()
                {

                });
                
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Result = false, Message = ex.Message });
            }

        }
    }
}
