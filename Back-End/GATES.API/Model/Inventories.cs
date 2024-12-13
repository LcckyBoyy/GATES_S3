namespace GATES.API.Model
{
	public class blCreateInventory
	{
		public string InventoryId { get; set; } = null!;

		public string InventoryName { get; set; } = null!;

		public string? Description { get; set; }
	}

	public class blUpdateInventory
    {
		public string InventoryId { get; set; } = null!;

		public string InventoryName { get; set; } = null!;

		public string? Description { get; set; }
	}
}
