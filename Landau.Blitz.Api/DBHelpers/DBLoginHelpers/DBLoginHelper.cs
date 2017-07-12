using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.AuthHelpers;
using Landau.Blitz.Api.Helpers.CryptHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.AuthData;
using Landau.Blitz.Api.Models.Error;
using Landau.Blitz.Api.Models.UserLogin;
using Microsoft.AspNet.Identity;

namespace Landau.Blitz.Api.DBHelpers.DBLoginHelpers
{
    public static class DBLoginHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string LoginUser(UserLoginModel loginModel)
        {
            try
            {
                string encryptPassword = Crypt.EncryptString(loginModel.UserPassword);
                using (var db = new LandauBlitzEntities())
                {
                    var userLogin = db.UserLogins
                        .FirstOrDefault(x => x.UserLogin.Equals(loginModel.UserLogin) &&
                                                        x.UserPassword.Equals(encryptPassword));

                    if (userLogin != null)
                    {
                        if (userLogin.UserLoginStateId == 2)
                        {
                            return AuthHelper.GetToUserAuthDataByLoginId(userLogin.Id);
                        }
                        else if (userLogin.UserLoginStateId ==3)
                        {
                            AuthDataModel model = new AuthDataModel();
                            model.Error = new ErrorModel()
                            {
                                Exception = "Пользователь заблокирован",
                                InnerException =
                                    "Данный пользователь был заблокирован. Для решения данной проблемы обратитесь к администратору системы!",
                                MethodName = "Авторизация"
                            };
                            return SerializeHelper.Serialize(model);
                        }
                    }
                    else
                    {
                        throw new Exception("Данные пользователя не найдены!");
                    }
                }
                return "";
            }
            catch (Exception e)
            {
                AuthDataModel model = new AuthDataModel()
                {
                    Error = new ErrorModel() {Exception = e.Message, InnerException = "Ошибка авторизации!"}
                };

                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                 innerException);

                return SerializeHelper.Serialize(model);  
            }
        }
    }
}