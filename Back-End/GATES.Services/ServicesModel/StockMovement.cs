using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
    public class daInsertStockMovement
    {
        public string MovementId { get; set; } = null!;

        public string ProductId { get; set; } = null!;

        public string MovementType { get; set; } = null!;

        public int Quantity { get; set; }

        public string? ReferenceNo { get; set; }

        public string? Notes { get; set; }

        public string? Status { get; set; }
    }

    public class daGetListStockMovement
    {
        public string MovementId { get; set; } = null!;

        public string ProductId { get; set; } = null!;

        public string MovementType { get; set; } = null!;

        public int Quantity { get; set; }

        public string? ReferenceNo { get; set; }

        public string? Notes { get; set; }

        public string? Status { get; set; }
    }

    public class daUpdateStockMovement
    {
        public string MovementId { get; set; } = null!;

        public string ProductId { get; set; } = null!;

        public string MovementType { get; set; } = null!;

        public int Quantity { get; set; }

        public string? ReferenceNo { get; set; }

        public string? Notes { get; set; }

        public string? Status { get; set; }
    }
}
