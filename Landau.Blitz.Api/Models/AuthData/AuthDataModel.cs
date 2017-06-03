using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.Models.Error;

namespace Landau.Blitz.Api.Models.AuthData
{
    /// <summary>
    /// auth data model
    /// </summary>
    public class AuthDataModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public AuthDataModel()
        {
            try
            {

            }
            catch (Exception e)
            {
            }
        }
        #endregion
        #region fields
        /// <summary>
        /// user id
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// user login
        /// </summary>
        public int UserLoginId { get; set; }

        /// <summary>
        /// first name
        /// </summary>
        public string UserFirstName { get; set; }

        /// <summary>
        /// last name
        /// </summary>
        public string UserLastName { get; set; }
        /// <summary>
        /// last login date
        /// </summary>
        public string LastLoginDate { get; set; }
        
        /// <summary>
        /// user role id
        /// </summary>
        public int UserRoleId { get; set; }

        /// <summary>
        /// user login state id
        /// </summary>
        public int UserLoginStateId { get; set; }

        /// <summary>
        /// email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// phone number
        /// </summary>
        public string PhoneNumber { get; set; }

        public int ClientId { get; set; }

        /// <summary>
        /// company name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// error
        /// </summary>
        public ErrorModel Error { get; set; }
        #endregion

    }
}