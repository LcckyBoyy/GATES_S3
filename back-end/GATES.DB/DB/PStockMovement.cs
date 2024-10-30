using System;
using System.Collections.Generic;

namespace GATES.DA.DB;

public partial class PStockMovement
{
    public string MovementId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string MovementType { get; set; } = null!;

    public int Quantity { get; set; }

    public string? ReferenceNo { get; set; }

    public DateTime MovementDate { get; set; }

    public string? Notes { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<PAuditLog> PAuditLogs { get; set; } = new List<PAuditLog>();

    public virtual PProduct Product { get; set; } = null!;
}
