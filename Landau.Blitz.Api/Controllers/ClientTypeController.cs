using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ClientHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class ClientTypeController : ApiController
    {
        // GET: api/ClientType
        public string Get()
        {
            return SerializeHelper.Serialize(ClientTypeHelper.GetToClientType());
        }

        // GET: api/ClientType/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientType
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ClientType/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ClientType/5
        public void Delete(int id)
        {
        }
    }
}
