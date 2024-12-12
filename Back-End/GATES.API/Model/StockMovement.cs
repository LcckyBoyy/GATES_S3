using System.ComponentModel.DataAnnotations;

namespace GATES.API.Model
{
    public class blInsertStockMovement
    {
        [Required]
        public string MovementId { get; set; } = null!;

        [Required]
        public string ProductId { get; set; } = null!;

        [Required]
        public string MovementType { get; set; } = null!;

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string? ReferenceNo { get; set; }

        public string? Notes { get; set; }

        public string? Status { get; set; }
    }

    public class blUpdateStockMovement
    {
        [Required]
        public string MovementId { get; set; } = null!;

        [Required]
        public string ProductId { get; set; } = null!;

        [Required]
        public string MovementType { get; set; } = null!;

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string? ReferenceNo { get; set; }

        public string? Notes { get; set; }

        public string? Status { get; set; }
    }
}
