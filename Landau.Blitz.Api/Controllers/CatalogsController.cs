using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Models.Catalogs;

namespace Landau.Blitz.Api.Controllers
{
    public class CatalogsController : ApiController
    {
        // GET: api/Catalogs
        public string Get()
        {
            return DBHelpers.DBCatalogHelpers.DBCatalogHelper.GetToCatalogs();
        }

        // GET: api/Catalogs/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Catalogs
        public string Post([FromBody]CatalogModel model)
        {
            return DBHelpers.DBCatalogHelpers.DBCatalogHelper.AddCatalog(model);
        }

        // PUT: api/Catalogs/5
        public string Put([FromBody]CatalogModel model)
        {
            return DBHelpers.DBCatalogHelpers.DBCatalogHelper.UpdateCatalog(model);
        }

        // DELETE: api/Catalogs/5
        public void Delete(int id)
        {
        }
    }
}
