using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ProjectHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class UserProjectsController : ApiController
    {
        // GET: api/UserProjects
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserProjects/5
        public string Get(int userId)
        {
            return ProjectHelper.GetToProjectByUserId(userId);
        }

        // POST: api/UserProjects
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/UserProjects/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserProjects/5
        public void Delete(int id)
        {
        }
    }
}
