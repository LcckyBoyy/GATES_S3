﻿namespace GATES.API.Model
{
    public class blCreateCategory
    {
        public string CategoryId { get; set; } = null!;

        public string InventoryId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }

    public class blUpdateCategory
    {
        public string InventoryId { get; set; } = null!;

        public string CategoryId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Description { get; set; }
    }
}
