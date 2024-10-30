using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PProductHistory
{
    public string HistoryId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public decimal OldPrice { get; set; }

    public decimal NewPrice { get; set; }

    public DateTime ChangedAt { get; set; }

    public string ChangedBy { get; set; } = null!;

    public virtual PProduct Product { get; set; } = null!;
}
