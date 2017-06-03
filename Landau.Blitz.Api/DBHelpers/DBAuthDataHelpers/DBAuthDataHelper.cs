using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.AuthData;
using System.Data.Entity;
namespace Landau.Blitz.Api.DBHelpers.DBAuthDataHelpers
{
    public static class DBAuthDataHelper
    {
        /// <summary>
        /// get to auth data by login id
        /// </summary>
        /// <returns></returns>
        public static string GetToUserAuthDataByLoginId(int loginId)
        {
            try
            {
                AuthDataModel model = new AuthDataModel();
                using (var db = new LandauBlitzEntities())
                {
                    var result = db.UserLogins
                        .Include(x => x.Users)
                        .Include(x=>x.Users.Clients).Select(y=>y)
                        
                        .FirstOrDefault(x=>x.Id==loginId);
                    if (result == null) return "";
                    model = new AuthDataModel()
                    {
                        Error = null,
                        LastLoginDate = result.LastLoginDate.ToString(),
                        UserFirstName = result.Users.FirstName,
                        UserLastName = result.Users.LastName,
                        Email = result.Users.Email,
                        PhoneNumber =  result.Users.PhoneNumber,
                        ClientId = (int)result.Users.ClientId,
                        CompanyName = result.Users.Clients.Name,
                        UserId =  result.UserId,
                        UserLoginId =result.Id,
                        UserRoleId = result.UserRoleId,
                        UserLoginStateId = result.UserLoginStateId

                    };

                    UserLogins login = db.UserLogins.FirstOrDefault(x=>x.Id==loginId);
                    if (login != null)
                    {
                        login.LastLoginDate = DateTime.Now;
                        db.SaveChanges();
                    }
                }

                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}