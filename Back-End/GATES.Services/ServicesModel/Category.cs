using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
    public class daInsertCategory
    {
        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }

    public class daGetListCategory
    {
        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }

    public class daUpdateCategory
    {
        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }
}
