using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PCategory
{
    public string CategoryId { get; set; } = null!;

    public string InventoryId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual PInventory Inventory { get; set; } = null!;

    public virtual ICollection<PProduct> PProducts { get; set; } = new List<PProduct>();
}
