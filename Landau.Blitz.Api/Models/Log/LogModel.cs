using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Log
{
    /// <summary>
    /// log record model
    /// </summary>
    public class LogModel
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// date
        /// </summary>
        public string Date { get; set; }
    }
}