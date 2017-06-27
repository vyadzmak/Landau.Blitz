using System;
using System.Web.Script.Serialization;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;

namespace Landau.Blitz.Api.Helpers.SerializeHelpers
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
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return "";
            }
        }
    }
}