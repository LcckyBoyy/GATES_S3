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
		public BaseResponse<bool> Registration(daRegistrationUser req)
		{
			var response = new BaseResponse<bool>();
			using (var server = new GatesContext())
			{
				var entity = (from i in server.MtUsers
							  where i.Email == req.Email
							  select i).FirstOrDefault();

				if (entity != null) { response.Message = "Email has been used!"; return response; }

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

				response.Result = true;
				response.Message = "Success";
				return response;
			}
		}

		public BaseResponse<daUserCookie> Login(string email, string password)
		{
			var res = new BaseResponse<daUserCookie>();
			using (var server = new GatesContext())
			{
				var user = server.MtUsers
					.Where(i => i.Email == email && i.IsActive == true)
					.FirstOrDefault();

				if (user == null) { res.Message = "Email not found"; return res; }
				if (password != user.PasswordSalt) { res.Message = "Worng password!"; return res; }

				res.Result = new daUserCookie
				{
					UserId = user.UserId,
					Username = user.Username,
					Email = user.Email
				};

				res.Message = "Success";
				return res;
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
