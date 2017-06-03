using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Template
{
    public class TemplateModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public TemplateModel()
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
        /// user creator id
        /// </summary>
        public int UserCreatorId { get; set; }

        /// <summary>
        /// user creator name
        /// </summary>
        public string UserCreatorName { get; set; }

        /// <summary>
        /// client id
        /// </summary>
        public int? ClientId { get; set; }
        
        /// <summary>
        /// template name
        /// </summary>
        public string Name { get; set; } 

        /// <summary>
        /// content
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// creation date
        /// </summary>
        public string CreationDate { get; set; }

        /// <summary>
        /// last update date
        /// </summary>
        public string LastUpdateDate { get; set; }

        /// <summary>
        /// description
        /// </summary>
        public string Description { get; set; }
        #endregion
    }
}