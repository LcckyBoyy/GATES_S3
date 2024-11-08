using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
	public class daRegistrationUser
	{
		public string UserId { get; set; } = null!;

		public string Username { get; set; } = null!;

		public string Email { get; set; } = null!;

		public string PasswordSalt { get; set; } = null!;
	}

	public class daGetUsers
	{
		public string? Name { get; set; }

		public string? Email { get; set; }
	}
}
