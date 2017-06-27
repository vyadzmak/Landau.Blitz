using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;

namespace Landau.Blitz.Api.Helpers.ContentGeneratorHelpers
{
    public class ContentGeneratorHelper
    {
        public static string GenerateHtml()
        {
            try
            {
                string content = "";

                content = "<script>$scope.hello = function(){alert('Hello peoples!');}</script><div><input type = 'button' ng-click = 'hello()' value='Hello' /></div> ";
                string d = SerializeHelpers.SerializeHelper.Serialize(content);
                return d;

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