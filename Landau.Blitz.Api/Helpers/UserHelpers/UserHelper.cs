using System;
using System.Collections.Generic;
using System.Linq;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBUserHelpers;
using Landau.Blitz.Api.Helpers.CryptHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.User;
using Landau.Blitz.Api.Models.UserLogin;
using Landau.Blitz.Api.Models.UserLoginState;
using Landau.Blitz.Api.Models.UserRole;

namespace Landau.Blitz.Api.Helpers.UserHelpers
{
    public class UserHelper
    {

        /// <summary>
        /// add user to db
        /// </summary>
        /// <returns></returns>
        public static string AddUser(UserModel model)
        {
            try
            {
                return DBUserHelper.AddUserToDb(model);
            }
            catch (Exception e)
            {
                return "Error";
            }
        }
        /// <summary>
        ///     get to users by company id
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public static string GetToUsersByCompanyId(int companyId, int userId)
        {
            try
            {
                var users = DBUserHelper.GetToAllUsersByCompanyId(companyId);

                var models = new List<UserModel>();

                foreach (var user in users)
                {
                    var model = new UserModel
                    {
                        ClientId = user.ClientId,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Id = user.Id,
                        PhoneNumber = user.PhoneNumber
                    };

                    if (user.UserLogins != null)
                    {
                        var l = user.UserLogins.ToList();
                        if (l.Count > 0)
                        {
                            var login = l.FirstOrDefault();

                            model.Login = new UserLoginModel
                            {
                                Id = login.Id,
                                LastLoginDate = login.LastLoginDate.ToString(),
                                RegistrationDate = login.RegistrationDate.ToString(),
                                UserLoginStateId = login.UserLoginStateId,
                                UserRoleId = login.UserRoleId,
                                UserLogin = login.UserLogin,
                                UserPassword = login.UserPassword,
                                DecryptedPassword = Crypt.DecryptString(login.UserPassword),
                                UserId = model.Id,
                                CurrentLoginState =
                                    new UserLoginStateModel
                                    {
                                        Id = login.UserLoginStates.Id,
                                        Description = login.UserLoginStates.Descritpion,
                                        Name = login.UserLoginStates.StateName
                                    },
                                CurrentRole =
                                    new UserRoleModel
                                    {
                                        Id = login.UserRoles.Id,
                                        Description = login.UserRoles.Description,
                                        Name = login.UserRoles.UserRoleName
                                    }
                            };

                            var ls = DBUserHelper.GetToAllUserLoginStates();
                            foreach (var state in ls)
                                model.Login.LoginStates.Add(new UserLoginStateModel
                                {
                                    Id = state.Id,
                                    Description = state.Descritpion,
                                    Name = state.StateName
                                });

                            var rs = DBUserHelper.GetToAllUserRoles(userId);
                            foreach (var role in rs)
                                model.Login.Roles.Add(new UserRoleModel
                                {
                                    Id = role.Id,
                                    Description = role.Description,
                                    Name = role.UserRoleName
                                });

                            model.Login.CurrentRole = model.Login.Roles.FirstOrDefault(x=>(int)x.Id==Convert.ToInt32(model.Login.UserRoleId));
                            model.Login.CurrentLoginState = model.Login.LoginStates.FirstOrDefault(x => (int)x.Id == Convert.ToInt32(model.Login.UserLoginStateId));

                        }
                    }


                    models.Add(model);
                }

                return SerializeHelper.Serialize(models);
            }
            catch (Exception e)
            {
                return "";
            }
            
        }

        /// <summary>
        /// get to user info by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string GetToUserInfoById(int id, int userId)
        {
            try
            {
                
                if (id == -1)
                {
                    UserModel model = new UserModel();
                    model.Login = new UserLoginModel();
                    var ls = DBUserHelper.GetToAllUserLoginStates();
                    foreach (var state in ls)
                        model.Login.LoginStates.Add(new UserLoginStateModel
                        {
                            Id = state.Id,
                            Description = state.Descritpion,
                            Name = state.StateName
                        });

                    var rs = DBUserHelper.GetToAllUserRoles(userId);
                    foreach (var role in rs)
                        model.Login.Roles.Add(new UserRoleModel
                        {
                            Id = role.Id,
                            Description = role.Description,
                            Name = role.UserRoleName
                        });

                    model.Login.CurrentRole = model.Login.Roles.FirstOrDefault();
                    model.Login.CurrentLoginState = model.Login.LoginStates.FirstOrDefault();
                    model.Login.UserRoleId = model.Login.CurrentRole.Id;
                    model.Login.UserLoginStateId = model.Login.CurrentLoginState.Id;

                    return SerializeHelper.Serialize(model);
                }
                else
                {
                    Users user = DBUserHelper.GetToUserById(id);
                    var model = new UserModel
                    {
                        ClientId = user.ClientId,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Id = user.Id,
                        PhoneNumber = user.PhoneNumber
                    };

                    if (user.UserLogins != null)
                    {
                        var l = user.UserLogins.ToList();
                        if (l.Count > 0)
                        {
                            var login = l.FirstOrDefault();

                            model.Login = new UserLoginModel
                            {
                                Id = login.Id,
                                UserLoginStateId = login.UserLoginStateId,
                                UserLogin = login.UserLogin,
                                UserPassword = login.UserPassword,
                                UserId = model.Id,
                                LastLoginDate = login.LastLoginDate.ToString(),
                                RegistrationDate = login.RegistrationDate.ToString(),
                                CurrentLoginState =
                                    new UserLoginStateModel
                                    {
                                        Id = login.UserLoginStates.Id,
                                        Description = login.UserLoginStates.Descritpion,
                                        Name = login.UserLoginStates.StateName
                                    },
                                CurrentRole =
                                    new UserRoleModel
                                    {
                                        Id = login.UserRoles.Id,
                                        Description = login.UserRoles.Description,
                                        Name = login.UserRoles.UserRoleName
                                    }
                            };

                            var ls = DBUserHelper.GetToAllUserLoginStates();
                            foreach (var state in ls)
                                model.Login.LoginStates.Add(new UserLoginStateModel
                                {
                                    Id = state.Id,
                                    Description = state.Descritpion,
                                    Name = state.StateName
                                });

                            var rs = DBUserHelper.GetToAllUserRoles(userId);
                            foreach (var role in rs)
                                model.Login.Roles.Add(new UserRoleModel
                                {
                                    Id = role.Id,
                                    Description = role.Description,
                                    Name = role.UserRoleName
                                });

                            model.Login.CurrentRole = model.Login.Roles.FirstOrDefault(x => (int)x.Id == Convert.ToInt32(model.Login.UserRoleId));
                            model.Login.CurrentLoginState = model.Login.LoginStates.FirstOrDefault(x => (int)x.Id == Convert.ToInt32(model.Login.UserLoginStateId));

                        }
                    }
                    return SerializeHelper.Serialize(model);

                }
                return "";
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// update user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string UpdateUser(UserModel model)
        {
            try
            {
                return SerializeHelper.Serialize(DBUserHelper.UpdateUserInDb(model));
            }
            catch (Exception e)
            {
                return SerializeHelper.Serialize(model);
            }
        }
    }
}