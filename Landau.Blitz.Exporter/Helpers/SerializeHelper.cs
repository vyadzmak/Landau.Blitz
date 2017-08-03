using System;
using System.Web.Script.Serialization;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class SerializeHelper
    {
        /// <summary>
        /// serialize object
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string Serialize(object obj)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = int.MaxValue;
                return serializer.Serialize(obj);
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                
                return "";
            }
        }

        /// <summary>
        /// deserialize object
        /// </summary>
        /// <param name="currentReportTemplate"></param>
        /// <returns></returns>

        public static ReportSchemaModel DeserializeReportSchema(string currentReportTemplate)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = int.MaxValue;

                return serializer.Deserialize<ReportSchemaModel>(currentReportTemplate);
            }
            catch (Exception e)
            {
                return null;
            }

        }
    }
}