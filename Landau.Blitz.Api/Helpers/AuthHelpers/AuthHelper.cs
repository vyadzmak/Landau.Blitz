using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DBHelpers.DBAuthDataHelpers;

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
                return "";
            }
        }
    }
}