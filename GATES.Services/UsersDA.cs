using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GATES.DA.Interface;
using GATES.DA.ServicesModel;
using GATES.DB.DB;

namespace GATES.DA
{
	public class UsersDA : IUsersDA
	{
		public bool Registration(daRegistrationUser req)
		{
			using (var server = new GatesContext())
			{
				var entity = (from i in server.MtUsers
							  where i.Username == req.Username
							  select i).FirstOrDefault();

				if (entity != null)
				{
					return false;
				}

				MtUser a = new()
				{
					UserId = req.UserId,
					Username = req.Username,
					Email = req.Email,
					PasswordSalt = req.PasswordSalt,

					CreatedAt = DateTime.UtcNow,
					LastLogin = DateTime.UtcNow,
					IsActive = true,
				};

				server.MtUsers.Add(a);
				server.SaveChanges();

				return true;
			}
		}
		public List<daGetUsers> GetList()
		{
			using (var server = new GatesContext())
			{
				var db = server.MtUsers.Select(i => new daGetUsers()
				{
					Name = i.Username,
					Email = i.Email
				}).ToList();

				return db;
			}
		}


	}
}
