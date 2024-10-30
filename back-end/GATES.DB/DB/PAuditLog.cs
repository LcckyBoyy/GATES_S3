using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PAuditLog
{
    public string LogId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string RecordId { get; set; } = null!;

    public string ActionType { get; set; } = null!;

    public string TableName { get; set; } = null!;

    public string OldValues { get; set; } = null!;

    public string NewValues { get; set; } = null!;

    public DateTime ActionTimestamp { get; set; }

    public string IpAddress { get; set; } = null!;

    public virtual PStockMovement Record { get; set; } = null!;

    public virtual MtUser User { get; set; } = null!;
}
