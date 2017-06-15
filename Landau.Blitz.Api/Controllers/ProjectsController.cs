using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ProjectHelpers;
using Landau.Blitz.Api.Models.Project;

namespace Landau.Blitz.Api.Controllers
{
    public class ProjectsController : ApiController
    {
        // GET: api/Projects
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Projects/5
        public string Get(int id)
        {
            return ProjectHelper.GetToProjectById(id);
        }

        // POST: api/Projects
        public string Post([FromBody]ProjectViewModel model)
        {
            return ProjectHelper.AddProjectToDb(model);
        }

        // PUT: api/Projects/5
        public string Put([FromBody]ProjectViewModel model)
        {
            return ProjectHelper.UpdateProjectInDb(model);
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
        }
    }
}
