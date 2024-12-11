using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PProduct
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

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; }

    public virtual PCategory Category { get; set; } = null!;

    public virtual PInventory Inventory { get; set; } = null!;

    public virtual ICollection<PStockMovement> PStockMovements { get; set; } = new List<PStockMovement>();

    public virtual PSupplier Supplier { get; set; } = null!;
}
