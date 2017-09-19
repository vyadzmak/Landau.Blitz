using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.DBHelpers.DBUserHelpers;
using Landau.Blitz.Api.Helpers.UserHelpers;
using Landau.Blitz.Api.Models.User;

namespace Landau.Blitz.Api.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/Users
        public string Get()
        {
            return "";
        }

        // GET: api/Users/5
        public string Get(int id, int userId)
        {
            return UserHelper.GetToUserInfoById(id,userId);
        }

        // POST: api/Users
        public string Post([FromBody]UserModel model)
        {
            return UserHelper.AddUser(model);
        }

        // PUT: api/Users/5
        public string Put([FromBody]UserModel model)
        {
            return UserHelper.UpdateUser(model);
        }

        // DELETE: api/Users/5
        public string Delete(int id)
        {
            return DBUserHelper.DeleteUser(id);
        }
    }
}
