using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Project
{
    public class ProjectViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ProjectViewModel()
        {
            try
            {

            }
            catch (Exception e)
            {
                
            }
        }
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// creation date
        /// </summary>
        public string CreationDate { get; set; }

        /// <summary>
        /// creator Id
        /// </summary>
        public int CreatorId { get; set; }
        /// <summary>
        /// content
        /// </summary>
        public string Content { get; set; }
    }
}