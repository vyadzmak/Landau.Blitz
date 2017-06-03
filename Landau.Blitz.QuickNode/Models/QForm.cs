using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.QuickNode.Models
{
    /// <summary>
    /// qform
    /// </summary>
    public class QForm
    {
        #region constructor 
        /// <summary>
        /// constructor
        /// </summary>
        public QForm()
        {
            try
            {
                Sheets = new List<QSheet>();
            }
            catch (Exception e)
            {
            }
        }
        #endregion

        #region fields

        /// <summary>
        /// id of form
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// name of form
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// ceation date
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// update date
        /// </summary>
        public DateTime UpdateDate { get; set; }
        /// <summary>
        /// sheets
        /// </summary>
        public List<QSheet> Sheets { get; set; }
        #endregion

    }
}
