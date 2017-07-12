using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Landau.Blitz.Api.Controllers
{
    public class ProjectConfigController : ApiController
    {
        // GET: api/ProjectConfig
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ProjectConfig/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ProjectConfig
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ProjectConfig/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ProjectConfig/5
        public void Delete(int id)
        {
        }
    }
}
