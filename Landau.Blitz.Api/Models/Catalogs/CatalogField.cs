using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Catalogs
{
    /// <summary>
    /// catalog field
    /// </summary>
    public class CatalogField
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// value
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// short title
        /// </summary>
        public string ShortTitle { get; set; }
    }
}