using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.DocumentHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class DocumentController : ApiController
    {
        // GET: api/Documents
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Documents/5
        public string Get(int id)
        {
            return DocumentHelper.GetDocumentByProjectId(id);
        }


        // POST: api/Projects
        //public string Post([FromBody]ProjectViewModel model)
        //{
        //    return ProjectHelper.AddProjectToDb(model);
        //}

        //// PUT: api/Projects/5
        //public string Put([FromBody]ProjectViewModel model)
        //{
        //    return ProjectHelper.UpdateProjectInDb(model);
        //}

        // DELETE: api/Documents/5
        public void Delete(int id)
        {
        }
    }
}
