﻿using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
    public class ProductDA : IProductDA
    {
        public BaseResponse<bool> Insert(daInsertProduct req)
        {
            var response = new BaseResponse<bool>();

            using (GatesContext server = new())
            {
                var db = server.PProducts.Where(i => i.ProductId == req.ProductId && i.InventoryId == req.InventoryId && i.IsActive == true).FirstOrDefault();
                if (db != null) { response.Message = "Product exist!";  return response; }

                server.PProducts.Add(new PProduct()
                {
                    ProductId = req.ProductId,
                    CategoryId = req.CategoryId,
                    InventoryId = req.InventoryId,
                    SupplierId = req.SupplierId,
                    ProductName = req.ProductName,
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
    
        public BaseResponse<List<daGetlistProduct>> GetList(string InventoryId, string? productName)
        {
            var response = new BaseResponse<List<daGetlistProduct>>();

            using (GatesContext server = new())
            {
                var products = server.PProducts.Where(i => i.InventoryId.Contains(InventoryId) && i.IsActive == true
                && (string.IsNullOrEmpty(productName) || i.ProductName.Contains(productName)))
                    .Select(i => new daGetlistProduct()
                    {
                        ProductId = i.ProductId,
                        ProductName = i.ProductName,
                        CategoryName = i.Category.Name,
                        SupplierName = i.Supplier.SupplierName,
                        CurrentStock = i.CurrentStock,
                        MinimumStock = i.MinimumStock,
                        UnitMeasure = i.UnitMeasure,
                        UnitPrice = i.UnitPrice
                    });

                response.Result = products.ToList();
            }

            return response;
        } 
        
        public BaseResponse<daUpdateProduct> GetProduct(string inventoryId, string productId)
        {
            var response = new BaseResponse<daUpdateProduct>();

            using (GatesContext server = new())
            {
                var product = server.PProducts.FirstOrDefault(i => i.InventoryId == inventoryId && i.ProductId == productId);

                if (product == null)
                {
                    response.Message = "Product not found!";
                    return response;
                }

                response.Result = new daUpdateProduct()
                {
                    ProductId = product.ProductId,
                    CategoryId = product.CategoryId,
                    InventoryId = product.InventoryId,
                    SupplierId = product.SupplierId,
                    ProductName = product.ProductName,
                    Description = product.Description,
                    Sku = product.Sku,
                    UnitPrice = product.UnitPrice,
                    CurrentStock = product.CurrentStock,
                    MinimumStock = product.MinimumStock,
                    UnitMeasure = product.UnitMeasure,
                };
                response.Message = "Success";
            }

            return response;
        }
        
        public BaseResponse<bool> Set(daUpdateProduct req)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var db = (from i in server.PProducts
                         where i.InventoryId == req.InventoryId && i.ProductId == req.ProductId
                         select i).FirstOrDefault();

                if (db == null)
                {
                    response.Message = "Product not found!";
                    return response;
                }

                db.CategoryId = req.CategoryId;
                db.SupplierId = req.SupplierId;
                db.ProductName = req.ProductName;
                db.Description = req.Description;
                db.Sku = req.Sku;
                db.UnitPrice = req.UnitPrice;
                db.CurrentStock = req.CurrentStock;
                db.MinimumStock = req.MinimumStock;
                db.UnitMeasure = req.UnitMeasure;
                db.UpdatedAt = DateTime.UtcNow;

                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";

            }

            return response;
        }

        public BaseResponse<bool> Remove(string productId, string inventoryId)
        {
            var response = new BaseResponse<bool>();
            using (GatesContext server = new())
            {
                var db = (from i in server.PProducts
                         where i.ProductId == productId && i.InventoryId == inventoryId
                         select i).FirstOrDefault();
                
                if (db == null)
                {
                    response.Message = "Prodcut doesn't exist!";
                    return response;
                }

                server.PProducts.Remove(db);
                server.SaveChanges();

                response.Result = true;
                response.Message = "Success";
            }
            return response;
        }
    }
}
