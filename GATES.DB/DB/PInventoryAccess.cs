using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PInventoryAccess
{
    public string InventoryAccesId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string InventoryId { get; set; } = null!;

    public DateTime GrantedAt { get; set; }

    public DateTime? ExpiredAt { get; set; }

    public bool IsActive { get; set; }

    public virtual PInventory Inventory { get; set; } = null!;

    public virtual MtUser User { get; set; } = null!;
}
