using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBProjectHelpers;
using Landau.Blitz.Api.DBHelpers.DBReportHelpers;
using Landau.Blitz.Api.DBHelpers.DBSettingsHelpers;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Newtonsoft.Json;
using QuarkPoint.Exporter.Helpers;
using QuarkPoint.Exporter.Models.TemplateModels;

namespace Landau.Blitz.Api.Helpers.ExportHelpers
{
    public static class ExportHelper
    {

        public static string ExportProject(int id)
        {
            try
            {
                DBLogHelper.AddLog("Export Project");
                int templateId =Convert.ToInt32(DBSettingHelper.GetSettingByName("MainExportTemplateId"));
                string content = DBProjectHelper.GetProjectEntityById(id).ProjectContent;
                string path = DBSettingHelper.GetSettingByName("ReportPhysicalPath");
                dynamic r_obj = JsonConvert.DeserializeObject(content);
                var currentProject = r_obj;

                if (currentProject == null)
                {
                    DBLogHelper.AddLog("PROJECT is NULL");
                }

                DBLogHelper.AddLog("TemplateId: " + templateId);

                ReportTemplates template = DBReportHelper.GetToReport(templateId);
                //DBLogHelper.AddLog("Template: "+template.Template);
                TemplateModel cTemplate = JsonConvert.DeserializeObject<TemplateModel>(template.Template);

                if (cTemplate==null)
                DBLogHelper.AddLog("Template is NULL");
                else
                {
                    DBLogHelper.AddLog("Template is not NULL");

                }

                string ext = ".docx";
                string dateTime = DateTime.Now.ToString();

                string fileName = new String(dateTime.Where(Char.IsDigit).ToArray()) + ext; ;

                string resultPath = Path.Combine(path, fileName);
                DBLogHelper.AddLog("resultPath="+ resultPath);

                //DBLogHelper.AddLog(currentProject.ToString());
                //DBLogHelper.AddLog(cTemplate.ToString());

                string result =GenerateProcessor.ExportDocument(currentProject, cTemplate, resultPath);
                //ReportSchemaModel model = SerializeHelper.DeserializeReportSchema(template.Template);
                DBLogHelper.AddLog("Result "+result);

                //string pt = processor.GenerateReport(path, SerializeHelper.Serialize(model), content);


                //FileStream str= new FileStream(pt,FileMode.Open, FileAccess.Read);
                string name = Path.GetFileName(resultPath);
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