using System;
using System.Collections.Generic;
using Landau.Blitz.Api.Models.UserLoginState;
using Landau.Blitz.Api.Models.UserRole;

namespace Landau.Blitz.Api.Models.UserLogin
{
    public class UserLoginModel
    {

        #region constructor

        /// <summary>
        /// constructor
        /// </summary>
        public UserLoginModel()
        {
            try
            {
                LoginStates = new List<UserLoginStateModel>();
                Roles = new List<UserRoleModel>();
                CurrentLoginState = new UserLoginStateModel();
                CurrentRole = new UserRoleModel();
            }
            catch (Exception e)
            {
                
            }
        }
        #endregion
        
        #region fields
        /// <summary>
        /// login id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// password
        /// </summary>
        public string UserLogin { get; set; }

        /// <summary>
        /// password
        /// </summary>
        public string UserPassword { get; set; }
        /// <summary>
        /// decr pass
        /// </summary>
        public string DecryptedPassword { get; set; }

        /// <summary>
        /// registration date
        /// </summary>
        public string RegistrationDate { get; set; }

        /// <summary>
        /// last login date
        /// </summary>
        public string LastLoginDate { get; set; }

        /// <summary>
        /// user id
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// user role id
        /// </summary>
        public int UserRoleId { get; set; }

        /// <summary>
        /// state id
        /// </summary>
        public int UserLoginStateId { get; set; }

        /// <summary>
        /// state models
        /// </summary>
        public List<UserLoginStateModel> LoginStates { get; set; }

        /// <summary>
        /// current login state
        /// </summary>
        public UserLoginStateModel CurrentLoginState { get; set; }

        /// <summary>
        /// role models
        /// </summary>
        public List<UserRoleModel> Roles { get; set; }


        /// <summary>
        /// current role
        /// </summary>
        public UserRoleModel CurrentRole { get; set; }
        #endregion
    }
}