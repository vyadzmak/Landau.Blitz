using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.ClientType
{
    public class ClientTypeModel
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// description
        /// </summary>
        public string Description { get; set; }
    }
}