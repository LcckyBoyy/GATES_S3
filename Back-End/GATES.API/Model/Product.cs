using System.ComponentModel.DataAnnotations;

namespace GATES.API.Model
{
    public class blCreateProduct
    {
        [Required]
        public string ProductId { get; set; } = null!;

        [Required]
        public string CategoryId { get; set; } = null!;

        [Required]
        public string InventoryId { get; set; } = null!;

        [Required]
        public string SupplierId { get; set; } = null!;

        [Required]
        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public string? Sku { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public int CurrentStock { get; set; }

        public int MinimumStock { get; set; }

        public string? UnitMeasure { get; set; }
    }

    public class blUpdateProduct
    {
        [Required]
        public string ProductId { get; set; } = null!;

        [Required]
        public string CategoryId { get; set; } = null!;

        [Required]
        public string InventoryId { get; set; } = null!;

        [Required]
        public string SupplierId { get; set; } = null!;

        [Required]
        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public string? Sku { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public int CurrentStock { get; set; }

        public int MinimumStock { get; set; }

        public string? UnitMeasure { get; set; }
    }
}
