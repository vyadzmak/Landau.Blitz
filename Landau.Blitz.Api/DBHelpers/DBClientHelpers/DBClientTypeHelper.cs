using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using System.Data.Entity;
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
        public static List<ClientTypes> GetToClientTypes(int userId=1)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    UserLogins login = db.UserLogins
                        
                        .FirstOrDefault(x => x.UserId == userId);

                    if (login != null)
                    {
                        int roleId = login.UserRoleId;

                        switch (roleId)
                        {
                            case 1:
                                return db.ClientTypes.Select(x => x)
                                    .ToList();
                                break;


                            case 2:
                                return db.ClientTypes.Select(x => x)
                                  .Where(x=>x.Id==2 || x.Id==3)
                                    .ToList();
                                break;

                            case 3:
                                return db.ClientTypes.Select(x => x)
                                    .Where(x => x.Id == 3)
                                    .ToList();
                                break;

                        }
                    }

                    return null;
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