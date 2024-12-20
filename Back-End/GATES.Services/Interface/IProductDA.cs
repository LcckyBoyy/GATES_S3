﻿using GATES.DA.ServicesModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.Interface
{
    public interface IProductDA
    {
        public BaseResponse<bool> Insert(daInsertProduct req);
        public BaseResponse<List<daGetlistProduct>> GetList(string InventoryId, string productName);
        public BaseResponse<daUpdateProduct> GetProduct(string inventoryId, string productId);
        public BaseResponse<bool> Set(daUpdateProduct req);
        public BaseResponse<bool> Remove(string inventoryId, string productId);
    }
}
