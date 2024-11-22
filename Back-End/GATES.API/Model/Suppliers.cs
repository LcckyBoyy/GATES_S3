using System.ComponentModel.DataAnnotations;

namespace GATES.API.Model
{
	public class blCreateSupplier
	{
		[Required]
		public string SupplierName { get; set; } = null!;

		public string? ContactPerson { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public string? Address { get; set; }
	}
}
