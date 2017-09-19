using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBClientHelpers;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Models.ClientType;

namespace Landau.Blitz.Api.Helpers.ClientHelpers
{
    public static class ClientTypeHelper
    {
        /// <summary>
        /// get to type clients 
        /// </summary>
        /// <returns></returns>
        public static List<ClientTypeModel> GetToClientType(int userId=1)
        {
            try
            {
                List<ClientTypes> clientTypes = DBClientTypeHelper.GetToClientTypes(userId);
                List<ClientTypeModel> models = new List<ClientTypeModel>();
                foreach (var type in clientTypes)
                {
                    models.Add(new ClientTypeModel()
                    {
                        Id = type.Id,
                        Description = type.Description,
                        Name = type.ClientTypeName
                    });
                }

                return models;
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