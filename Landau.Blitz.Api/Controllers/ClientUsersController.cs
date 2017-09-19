using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.UserHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class ClientUsersController : ApiController
    {
        // GET: api/ClientUsers
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ClientUsers/5
        public string Get(int id, int userId)
        {
            return UserHelper.GetToUsersByCompanyId(id, userId);
        }

        // POST: api/ClientUsers
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ClientUsers/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ClientUsers/5
        public void Delete(int id)
        {
        }
    }
}
