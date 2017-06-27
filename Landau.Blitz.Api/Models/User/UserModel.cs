using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.Models.UserLogin;

namespace Landau.Blitz.Api.Models.User
{
    /// <summary>
    /// user model
    /// </summary>
    public class UserModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public UserModel()
        {
            try
            {
                Login = new UserLoginModel();
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
        public int Id { get; set; }

        /// <summary>
        /// first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// phone number
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// client id
        /// </summary>
        public int? ClientId { get; set; }

        /// <summary>
        /// login
        /// </summary>
        public UserLoginModel Login { get; set; }
        #endregion
    }
}