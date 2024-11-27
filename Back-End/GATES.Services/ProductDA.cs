using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA
{
    public class ProductDA : IProductDA
    {
        public BaseResponse<bool> Insert(daInsertProduct req)
        {
            var response = new BaseResponse<bool>();

            using (GatesContext server = new())
            {
                var db = server.PProducts.Where(i => i.IsActive == true).FirstOrDefault();
                if (db != null) { response.Message = "Product Exist";  return response; }

                server.PProducts.Add(new PProduct()
                {

                });
            }

            return response;
        }
    }
}
