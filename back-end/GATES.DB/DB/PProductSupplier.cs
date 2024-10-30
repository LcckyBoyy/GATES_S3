using System;
using System.Collections.Generic;

namespace GATES.DA.DB;

public partial class PProductSupplier
{
    public string ProductSuppliersId { get; set; } = null!;

    public string SupplierId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public bool IsActive { get; set; }

    public virtual PProduct Product { get; set; } = null!;

    public virtual MtSupplier Supplier { get; set; } = null!;
}
