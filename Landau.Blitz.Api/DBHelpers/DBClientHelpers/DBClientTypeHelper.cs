using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;

namespace Landau.Blitz.Api.DBHelpers.DBClientHelpers
{
    /// <summary>
    /// client type
    /// </summary>
    public static class DBClientTypeHelper
    {
        /// <summary>
        /// get to client types
        /// </summary>
        /// <returns></returns>
        public static List<ClientTypes> GetToClientTypes()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.ClientTypes.Select(x => x)
                        .Where(x=>x.Id!=1 && x.Id!=2)
                        .ToList();
                }
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return null;
            }
        }
    }
}