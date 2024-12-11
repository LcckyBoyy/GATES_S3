using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
	public class daInsertSupplier
	{
		public string SupplierName { get; set; } = null!;

		public string? ContactPerson { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public string? Address { get; set; }
	}
	
	public class daGetListSupplier
	{
        public string SupplierId { get; set; } = null!;

        public string SupplierName { get; set; } = null!;

        public string? ContactPerson { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }
    }
}
