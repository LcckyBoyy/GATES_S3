using System;
using System.Collections.Generic;

namespace GATES.DB.DB;

public partial class PProductImage
{
    public string ImageId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string ImageUrl { get; set; } = null!;

    public string ImageType { get; set; } = null!;

    public bool IsPriamary { get; set; }

    public DateTime UplodedAt { get; set; }

    public virtual PProduct Product { get; set; } = null!;
}
