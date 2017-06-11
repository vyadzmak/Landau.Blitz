using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Catalogs
{
    public class CatalogModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public CatalogModel()
        {
            try
            {
                Fields = new List<CatalogField>();
            }
            catch (Exception e)
            {
            }
        }
        #endregion

        #region fields
        /// <summary>
        /// catalog id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// catalog name
        /// </summary>
        public string Name { get; set;  }

        /// <summary>
        /// system name
        /// </summary>
        public string SystemName { get; set; }

        /// <summary>
        /// constent
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// fields
        /// </summary>
        public List<CatalogField> Fields { get; set; }
        #endregion
    }
}