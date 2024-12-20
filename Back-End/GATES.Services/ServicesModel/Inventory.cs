﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
	public class daInsertInventory
	{
		public string InventoryId { get; set; } = null!;

		public string InventoryName { get; set; } = null!;

		public string? Description { get; set; }

		public string OwnerId { get; set; } = null!;
	}

	public class daGetInventory
	{
        public string InventoryName { get; set; } = null!;

        public string? Description { get; set; }
    }

	public class daUpdateInventory
	{
		public string InventoryId { get; set; } = null!;

		public string InventoryName { get; set; } = null!;

		public string? Description { get; set; }

        public string OwnerId { get; set; } = null!;
    }

    public class daGetlistInventory
	{
		public string InventoryId { get; set; } = null!;

		public string InventoryName { get; set; } = null!;

		public string? Description { get; set; }

		public string OwnerId { get; set; } = null!;
	}

	public class daGetListAccess
	{
		public string Username { get; set; } = null!;

		public string Email { get; set; } = null!;
	}
}
