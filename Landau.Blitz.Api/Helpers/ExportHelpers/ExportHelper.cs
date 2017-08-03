using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBProjectHelpers;
using Landau.Blitz.Api.DBHelpers.DBReportHelpers;
using Landau.Blitz.Api.DBHelpers.DBSettingsHelpers;
using Landau.Blitz.Exporter;
using Landau.Blitz.Exporter.Helpers;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using System.IO;
using System.IO.Compression;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;

namespace Landau.Blitz.Api.Helpers.ExportHelpers
{
    public static class ExportHelper
    {

        public static string ExportProject(int id)
        {
            try
            {
                ExportProcessor processor = new ExportProcessor();
                int templateId =Convert.ToInt32(DBSettingHelper.GetSettingByName("MainExportTemplateId"));
                string content = DBProjectHelper.GetProjectEntityById(id).ProjectContent;
                string path = DBSettingHelper.GetSettingByName("ReportPhysicalPath");
               
                ReportTemplates template = DBReportHelper.GetToReport(templateId);
                ReportSchemaModel model = SerializeHelper.DeserializeReportSchema(template.Template);

                 string pt = processor.GenerateReport(path, SerializeHelper.Serialize(model), content);


                //FileStream str= new FileStream(pt,FileMode.Open, FileAccess.Read);
                string name = Path.GetFileName(pt);
                return name;

            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return "";
            }
        }
    }
}