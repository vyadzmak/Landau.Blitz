using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DBHelpers.DBAuthDataHelpers;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;

namespace Landau.Blitz.Api.Helpers.AuthHelpers
{
    public static class AuthHelper
    {
        /// <summary>
        /// get to user auth data
        /// </summary>
        /// <returns></returns>
        public static string GetToUserAuthDataByLoginId(int loginId)
        {
            try
            {
                return DBAuthDataHelper.GetToUserAuthDataByLoginId(loginId);
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