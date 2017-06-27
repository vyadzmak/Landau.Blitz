using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.DBHelpers.DBClientHelpers;
using Landau.Blitz.Api.Helpers.ClientHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.ClientModel;

namespace Landau.Blitz.Api.Controllers
{
    public class ClientsController : ApiController
    {
        // GET: api/Clients
        public string Get()
        {
            return ClientHelper.GetToCompanies();
        }

        // GET: api/Clients/5
        public string Get(int id)
        {
            return ClientHelper.GetToCompanyById(id);
        }

        // POST: api/Clients
        public string Post([FromBody]ClientModel model)
        {
            return ClientHelper.AddCompany(model);
        }

        // PUT: api/Clients/5
        public string Put([FromBody]ClientModel model)
        {
            return ClientHelper.UpdateCompany(model);
        }

        // DELETE: api/Clients/5
        public string Delete(int id)
        {
            return ClientHelper.DeleteCompany(id);
        }
    }
}
