using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using System.Data.Entity;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.CryptHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.User;

namespace Landau.Blitz.Api.DBHelpers.DBUserHelpers
{
    public static class DBUserHelper
    {
        /// <summary>
        /// get to all users by company id
        /// </summary>
        /// <returns></returns>
        public static List<Users> GetToAllUsersByCompanyId(int companyId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    List<Users> users = db.Users.Where(x => x.ClientId == companyId)
                        .Include(x => x.UserLogins)
                        .Include(x => x.UserLogins.Select(y=>y.UserLoginStates))
                        .Include(x => x.UserLogins.Select(y=>y.UserRoles))
                        
                        .ToList();
                    
                    

                    return users;
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

        /// <summary>
        /// get to all users by company id
        /// </summary>
        /// <returns></returns>
        public static Users GetToUserById(int userId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Users users = db.Users.Where(x => x.Id == userId)
                        .Include(x => x.UserLogins)
                        .Include(x => x.UserLogins.Select(y => y.UserLoginStates))
                        .Include(x => x.UserLogins.Select(y => y.UserRoles))
                        .FirstOrDefault();
                        



                    return users;
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

        /// <summary>
        /// get to all user roles
        /// </summary>
        /// <returns></returns>
        public static List<UserRoles> GetToAllUserRoles(int userId=1)
        {
            try
            {
                using (var db= new LandauBlitzEntities())
                {

                    UserLogins login = db.UserLogins

                        .FirstOrDefault(x => x.UserId == userId);

                    if (login != null)
                    {
                        int roleId = login.UserRoleId;

                        switch (roleId)
                        {
                            case 1:
                                return db.UserRoles.Select(x => x)
                                    .ToList();
                                break;


                            case 2:
                                return db.UserRoles.Select(x => x)
                                    .Where(x => x.Id == 2 || x.Id == 3 || x.Id==4)
                                    .ToList();
                                break;

                            case 3:
                                return db.UserRoles.Select(x => x)
                                    .Where(x => x.Id == 3|| x.Id==4)
                                    .ToList();
                                break;

                        }
                    }

                    return null;
                   // return db.UserRoles.Where(x=>x.Id==4).ToList();
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

        /// <summary>
        /// get to all user roles
        /// </summary>
        /// <returns></returns>
        public static List<UserLoginStates> GetToAllUserLoginStates()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.UserLoginStates.ToList();
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


        /// <summary>
        /// add user to db
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string AddUserToDb(UserModel model)
        {
            try
            {
                using (var db= new LandauBlitzEntities())
                {

                    var exists = db.UserLogins.FirstOrDefault(x => x.UserLogin.Equals(model.Login.UserLogin));
                    if (exists != null) return "Error";

                    Users user = new Users()
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Email = model.Email,
                        PhoneNumber = model.PhoneNumber,
                        ClientId = model.ClientId
                    };

                    db.Users.Add(user);
                    db.SaveChanges();
                    model.Id = user.Id;

                    UserLogins login = new UserLogins()
                    {
                        RegistrationDate = DateTime.Now,
                        UserId = model.Id,
                        LastLoginDate = null,
                        UserLogin = model.Email,
                        UserPassword = Crypt.EncryptString(model.Login.UserPassword),
                        UserLoginStateId = model.Login.CurrentLoginState.Id,
                        UserRoleId = model.Login.CurrentRole.Id,

                    };
                    db.UserLogins.Add(login);
                    db.SaveChanges();
                    model.Login.Id = login.Id;
                    model.Login.RegistrationDate = login.RegistrationDate.ToString();
                    model.Login.DecryptedPassword = model.Login.UserPassword;
                }
                return SerializeHelper.Serialize(model);

            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return "Error";
            }
        }

        /// <summary>
        /// delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string DeleteUser(int id)
        {

            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    UserLogins logins = db.UserLogins.FirstOrDefault(x => x.UserId == id);
                    if (logins != null)
                    {
                        db.UserLogins.Remove(logins);
                        db.SaveChanges();
                    }

                    Users user = db.Users.FirstOrDefault(x => x.Id == id);
                    if (user != null)
                    {
                        db.Users.Remove(user);
                        db.SaveChanges();
                    }
                }

                return "OK";
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return "Error";
            }
        }

        /// <summary>
        /// update user in db
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static UserModel UpdateUserInDb(UserModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {


                    Users user = db.Users.FirstOrDefault(x=>x.Id==model.Id);
                    if (user != null) 
                    {
                        user.FirstName = model.FirstName;
                        user.LastName = model.LastName;
                        user.Email = model.Email;
                        user.PhoneNumber = model.PhoneNumber;
                        user.ClientId = model.ClientId;
                    };

                    
                    db.SaveChanges();
                    model.Id = user.Id;

                    UserLogins login =db.UserLogins.FirstOrDefault(x=>x.Id==model.Login.Id);
                    if (login!=null)
                    {
                        login.UserLogin = model.Email;
                        login.UserPassword = Crypt.EncryptString(model.Login.UserPassword);
                        login.UserLoginStateId = model.Login.CurrentLoginState.Id;
                        login.UserRoleId = model.Login.CurrentRole.Id;
                        model.Login.DecryptedPassword = Crypt.DecryptString(login.UserPassword);

                    };
                    db.SaveChanges();
                   
                }
                return model;
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return model;
            }

        }
    }
}