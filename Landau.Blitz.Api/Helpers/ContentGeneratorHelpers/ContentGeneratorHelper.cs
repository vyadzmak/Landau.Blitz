using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
                return "";
            }
        }
    }
}