using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Landau.Blitz.Exporter.Helpers;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;

namespace Landau.Blitz.Exporter
{
    public class ExportProcessor
    {
        #region constructor

        /// <summary>
        ///     constructor
        /// </summary>
        public ExportProcessor()
        {
            try
            {
            }
            catch (Exception e)
            {
            }
        }

        #endregion


        #region methods

        /// <summary>
        ///     generate report
        /// </summary>
        public string GenerateReport(string dirName, string settings, string json)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var project = serializer.DeserializeObject(json);

                var name = DateTime.Now.ToString();
                var rgx = new Regex("[^a-zA-Z0-9 -]");
                name = rgx.Replace(name, "");
                name = name.Replace(" ", "") + ".docx";
                var exportPath = Path.Combine(dirName, name);
                var package =
                    WordprocessingDocument.Create(exportPath, WordprocessingDocumentType.Document);
                package.AddMainDocumentPart();
                var body = new Body();
                package.MainDocumentPart.Document = new Document(body);
                var seriallizer = new JavaScriptSerializer();

                var reportSchemaModel = seriallizer.Deserialize<ReportSchemaModel>(settings);

                foreach (var element in reportSchemaModel.Elements)
                    switch (element.ElementType)
                    {
                        case ElementType.Paragraph:
                            var c = element.Text.Split('~').ToList();

                            foreach (var v in c)
                            {

                                string t = v.Replace("~", string.Empty);
                                t = VariablesHelper.InitVarInLine(project, t);

                                GenerateParagraphHelper.GenerateParagraph(body, element, t);
                            }
                            break;

                        case ElementType.Table:
                            GenerateTableHelper.GenerateTable(project,body, element);
                            break;
                    }

              
                package.MainDocumentPart.Document.Save();
                package.Close();
                return exportPath;
                //Process.Start(exportPath);
            }
            catch (Exception e)
            {
                return "";
            }
        }

        #endregion
    }
}