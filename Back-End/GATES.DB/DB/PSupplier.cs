using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PSupplier
{
    public string SupplierId { get; set; } = null!;

    public string InventoryId { get; set; } = null!;

    public string SupplierName { get; set; } = null!;

    public string? ContactPerson { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public bool IsActive { get; set; }

    public virtual PInventory Inventory { get; set; } = null!;

    public virtual ICollection<PProduct> PProducts { get; set; } = new List<PProduct>();
}
