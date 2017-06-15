using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ContentGeneratorHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class ContentGeneratorController : ApiController
    {
        // GET: api/ContentGenerator
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ContentGenerator/5
        public string Get(int id)
        {
            return ContentGeneratorHelper.GenerateHtml();
        }

        // POST: api/ContentGenerator
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ContentGenerator/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ContentGenerator/5
        public void Delete(int id)
        {
        }
    }
}
