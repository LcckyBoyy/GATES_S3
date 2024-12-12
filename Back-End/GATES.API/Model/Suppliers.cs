using System.ComponentModel.DataAnnotations;

namespace GATES.API.Model
{
	public class blCreateSupplier
	{
		[Required]
		public string SupplierId { get; set; } = null!;

		[Required]
		public string InventoryId { get; set; } = null!;

		[Required]
		public string SupplierName { get; set; } = null!;

		public string? ContactPerson { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public string? Address { get; set; }
	}

    public class blUpdateSupplier
    {
        public string SupplierId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string SupplierName { get; set; } = null!;

        public string? ContactPerson { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }
    }
}
