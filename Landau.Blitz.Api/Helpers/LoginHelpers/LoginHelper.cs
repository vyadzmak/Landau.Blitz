using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
                return "";
            }
        }
    }
}