using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
    public class daInsertProduct
    {
        public string ProductId { get; set; } = null!;

        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string SupplierId { get; set; } = null!;

        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public string? Sku { get; set; }

        public decimal UnitPrice { get; set; }

        public int CurrentStock { get; set; }

        public int MinimumStock { get; set; }

        public string? UnitMeasure { get; set; }
    }

	public class daGetlistProduct
    {
        public string ProductName { get; set; } = null!;

        public string ProductId { get; set; } = null!;

        public int CurrentStock { get; set; }

        public string? UnitMeasure { get; set; }

        public string CategoryId { get; set; } = null!;

        public decimal UnitPrice { get; set; }


    }

    public class daUpdateProduct
    {
        public string ProductId { get; set; } = null!;

        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!; 

        public string SupplierId { get; set; } = null!;

        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public string? Sku { get; set; }

        public decimal UnitPrice { get; set; }

        public int CurrentStock { get; set; }

        public int MinimumStock { get; set; }

        public string? UnitMeasure { get; set; }
    }
}
