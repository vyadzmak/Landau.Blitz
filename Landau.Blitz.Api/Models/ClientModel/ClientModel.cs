using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.Helpers.ClientHelpers;
using Landau.Blitz.Api.Models.ClientType;

namespace Landau.Blitz.Api.Models.ClientModel
{
    /// <summary>
    /// client model
    /// </summary>
    public class ClientModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public ClientModel()
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
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// registration number
        /// </summary>
        public string  RegistrationNumber { get; set; }

        /// <summary>
        /// registration date
        /// </summary>
        public string RegistrationDate { get; set; }

        /// <summary>
        /// address
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// clientType Id
        /// </summary>
        public int ClientTypeId { get; set; }


        /// <summary>
        /// current client type
        /// </summary>
        public ClientTypeModel CurrentClientType { get; set; }
        /// <summary>
        /// name of type
        /// </summary>
        public string ClientTypeName { get; set; }

        /// <summary>
        /// client types list
        /// </summary>
        public List<ClientTypeModel> ClientTypes { get; set; }

        /// <summary>
        /// user creator ID
        /// </summary>
        public int UserCreatorId { get; set; }
        /// <summary>
        /// client creator id
        /// </summary>
        public int ClientCreatorId { get; set; }

        /// <summary>
        /// registration date
        /// </summary>
        public string StateRegistrationDate { get; set; }

        /// <summary>
        /// registration date
        /// </summary>
        public int? OrganizationType { get; set; }
        #endregion

    }
}