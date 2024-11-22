using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class MtSupplier
{
    public string SupplierId { get; set; } = null!;

    public string SupplierName { get; set; } = null!;

    public string? ContactPerson { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<PProductSupplier> PProductSuppliers { get; set; } = new List<PProductSupplier>();
}
