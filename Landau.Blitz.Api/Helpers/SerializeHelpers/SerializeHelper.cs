using System;
using System.Web.Script.Serialization;

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
                return serializer.Serialize(obj);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}