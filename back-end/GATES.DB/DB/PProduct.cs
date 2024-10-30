using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PProduct
{
    public string ProductId { get; set; } = null!;

    public string CategoryId { get; set; } = null!;

    public string InventoryId { get; set; } = null!;

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

    public virtual MtCategory Category { get; set; } = null!;

    public virtual PInventory Inventory { get; set; } = null!;

    public virtual ICollection<PProductHistory> PProductHistories { get; set; } = new List<PProductHistory>();

    public virtual ICollection<PProductImage> PProductImages { get; set; } = new List<PProductImage>();

    public virtual ICollection<PProductSupplier> PProductSuppliers { get; set; } = new List<PProductSupplier>();

    public virtual ICollection<PStockMovement> PStockMovements { get; set; } = new List<PStockMovement>();
}
