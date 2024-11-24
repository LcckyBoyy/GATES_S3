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
		public BaseResponse<bool> Registration(daRegistrationUser req);

		public List<daGetUsers> GetList();

		public BaseResponse<daUserCookie> Login(string username, string password);
	}
}
