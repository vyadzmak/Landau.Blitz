using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Exporter;
using System.IO;
using System.Web.Script.Serialization;

namespace Landau.Blitz.Api.Helpers.DocumentHelpers
{
    public static class DocumentHelper
    {
        public static string GetDocumentByProjectId(int id)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string model = DBHelpers.DBProjectHelpers.DBProjectHelper.GetProjectEntityById(id).ProjectContent;
            Models.Project.ProjectViewModel o = serializer.Deserialize<Models.Project.ProjectViewModel>(model);


            DocumentHelper.ExportModelToDocx(new object());

            return "";
        }

        private static void ExportModelToDocx(object model)
        {
            try
            {
                Landau.Blitz.Exporter.ExportProcessor exportProcessor =
                    new ExportProcessor();

                string mainPath = DBHelpers.DBSettingsHelpers.DBSettingHelper.GetSettingByName("MainPath");
                string reportPath = DBHelpers.DBSettingsHelpers.DBSettingHelper.GetSettingByName("ReportsPath");



              //  FileStream fileStream = exportProcessor.CreateTestDocument(Path.Combine(mainPath, reportPath));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}