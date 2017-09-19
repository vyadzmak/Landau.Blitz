using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ClientHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class UserClientsController : ApiController
    {
        // GET: api/UserClients
        public string Get(int clientId, int userId)
        {
            return ClientHelper.GetToCompanyByUserAndClientId(clientId, userId);
        }

        // GET: api/UserClients/5
        public string Get(int userId)
        {
            return ClientHelper.GetToCompaniesByUserId(userId);
        }

        // POST: api/UserClients
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/UserClients/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserClients/5
        public string Delete(int id)
        {
            try
            {
                return ClientHelper.DeleteCompany(id);
            }
            catch (Exception e)
            {
                return "Error";
            }
        }
    }
}
