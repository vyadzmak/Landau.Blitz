using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.DBHelpers.DBLoginHelpers;
using Landau.Blitz.Api.Models.UserLogin;

namespace Landau.Blitz.Api.Helpers.LoginHelpers
{
    /// <summary>
    /// login helper
    /// </summary>
    public static class LoginHelper
    {
        /// <summary>
        /// login user
        /// </summary>
        /// <returns></returns>
        public static string LoginUser(UserLoginModel model)
        {
            try
            {
                return DBLoginHelper.LoginUser(model);
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