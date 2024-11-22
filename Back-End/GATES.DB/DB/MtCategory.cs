using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class MtCategory
{
    public string CategoryId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<PProduct> PProducts { get; set; } = new List<PProduct>();
}
