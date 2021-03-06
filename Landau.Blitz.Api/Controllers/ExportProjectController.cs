﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using Landau.Blitz.Api.Helpers.ExportHelpers;

namespace Landau.Blitz.Api.Controllers
{
    public class ExportProjectController : ApiController
    {
        // GET: api/ExportProject
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ExportProject/5
        public HttpResponseMessage Get(int id)
        {
            try
            {


                string fileName = ExportHelper.ExportProject(id);
                //if (fileName.StartsWith("Error"))
                //    return this.Request.CreateResponse(HttpStatusCode.NotFound, fileName);
                if (!string.IsNullOrEmpty(fileName))
                {
                    string filePath = HttpContext.Current.Server.MapPath("~/data/reports/") + fileName;

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (FileStream file = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                        {
                            byte[] bytes = new byte[file.Length];
                            file.Read(bytes, 0, (int) file.Length);
                            ms.Write(bytes, 0, (int) file.Length);

                            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                            httpResponseMessage.Content = new ByteArrayContent(bytes.ToArray());
                            httpResponseMessage.Content.Headers.Add("x-filename", fileName);
                            httpResponseMessage.Content.Headers.ContentType =
                                new MediaTypeHeaderValue("application/octet-stream");
                            httpResponseMessage.Content.Headers.ContentDisposition =
                                new ContentDispositionHeaderValue("attachment");
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileName;
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                            return httpResponseMessage;
                        }
                    }
                }
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, "Internal Server Error.");
            }
            catch (Exception e)
            {
                return this.Request.CreateResponse(HttpStatusCode.NotFound, "Internal Server Error.");
            }
        }

        // POST: api/ExportProject
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ExportProject/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ExportProject/5
        public void Delete(int id)
        {
        }
    }
}
