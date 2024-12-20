﻿using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PInventory
{
    public string InventoryId { get; set; } = null!;

    public string InventoryName { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsActive { get; set; }

    public string OwnerId { get; set; } = null!;

    public virtual MtUser Owner { get; set; } = null!;

    public virtual ICollection<PCategory> PCategories { get; set; } = new List<PCategory>();

    public virtual ICollection<PInventoryAccess> PInventoryAccesses { get; set; } = new List<PInventoryAccess>();

    public virtual ICollection<PProduct> PProducts { get; set; } = new List<PProduct>();

    public virtual ICollection<PSupplier> PSuppliers { get; set; } = new List<PSupplier>();
}
