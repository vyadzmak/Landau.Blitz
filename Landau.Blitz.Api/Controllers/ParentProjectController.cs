using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ProjectHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class ParentProjectController : ApiController
    {
        // GET: api/ParentProject
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ParentProject/5
        public string Get(int id)
        {
            return ProjectHelper.GetToParentProjectById(id);
        }

        // POST: api/ParentProject
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ParentProject/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ParentProject/5
        public void Delete(int id)
        {
        }
    }
}
