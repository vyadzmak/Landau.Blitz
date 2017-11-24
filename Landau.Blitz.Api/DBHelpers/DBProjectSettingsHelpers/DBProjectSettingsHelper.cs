using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.Models.ClientModel;

namespace Landau.Blitz.Api.DBHelpers.DBProjectSettingsHelpers
{
    public static class DBProjectSettingsHelper
    {
        /// <summary>
        /// get to clients
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="regNum"></param>
        /// <returns></returns>
        public static List<Clients> GetToClientsByUserIdRegistrationNumber(int userId, string regNum)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    int clientId =(int)db.Users.FirstOrDefault(x => x.Id == userId).ClientId;

                    return db.Clients.Where(x => x.ClientTypeId == 3 && x.ClientCreatorId==clientId 
                    && x.RegistrationNumber.Contains(regNum)).ToList();
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}