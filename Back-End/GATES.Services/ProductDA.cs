using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
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
                var db = server.PProducts.Where(i => i.ProductId == req.ProductId && i.IsActive == true).FirstOrDefault();
                if (db != null) { response.Message = "Product Exist";  return response; }

                server.PProducts.Add(new PProduct()
                {
                    ProductId = req.ProductId,
                    ProductName = req.ProductName,
                    CategoryId = req.CategoryId,
                    InventoryId = req.InventoryId,
                    Description = req.Description,
                    UnitPrice = req.UnitPrice,
                    UnitMeasure = req.UnitMeasure,
                    Sku = req.Sku,
                    MinimumStock = req.MinimumStock,
                    CurrentStock = req.CurrentStock,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                });

                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }

            return response;
        }
    
        public BaseResponse<List<daGetlistProduct>> GetList(string userId, string InventoryId)
        {
            var response = new BaseResponse<List<daGetlistProduct>>();

            using (GatesContext server = new())
            {
                var acces = (from i in server.PInventoryAccesses
                             where i.InventoryId == InventoryId && i.UserId == userId
                             select i.InventoryId).FirstOrDefault();

                if (acces == null)
                {
                    response.Message = "You dont have the acces for this inventory";
                    return response;
                }

                var products = server.PProducts.Where(i => i.InventoryId.Contains(InventoryId) && i.IsActive == true)
                    .Select(i => new daGetlistProduct()
                    {
                        ProductId = i.ProductId,
                        ProductName = i.ProductName,
                        CategoryId = i.CategoryId,
                        CurrentStock = i.CurrentStock,
                        UnitMeasure = i.UnitMeasure,
                        UnitPrice = i.UnitPrice,
                    }).ToList();

                response.Result = products;
            }

            return response;
        } 
        
    }
}
