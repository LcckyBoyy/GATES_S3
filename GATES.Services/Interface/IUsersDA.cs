using GATES.DA.ServicesModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.Interface
{
	public interface IUsersDA
	{
		public bool Registration(daRegistrationUser req);
		public List<daGetUsers> GetList();
	}
}
