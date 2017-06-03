using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.TemplateHelpers;
using Landau.Blitz.Api.Models.Template;

namespace Landau.Blitz.Api.Controllers
{
    public class TemplatesController : ApiController
    {
        // GET: api/Templates
        public string Get()
        {
            return TemplateHelper.GetToAllTemplates();
        }

        // GET: api/Templates/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Templates
        public string Post([FromBody]TemplateModel value)
        {
            return TemplateHelper.AddTemplateToDb(value);
        }

        // PUT: api/Templates/5
        public string Put(TemplateModel value)
        {
            return TemplateHelper.UpdateTemplate(value);
        }

        // DELETE: api/Templates/5
        public void Delete(int id)
        {
        }
    }
}
