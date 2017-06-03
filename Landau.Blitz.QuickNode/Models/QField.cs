using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Landau.Blitz.QuickNode.Models.GeneralModels;


namespace Landau.Blitz.QuickNode.Models
{
    /// <summary>
    /// qfield
    /// </summary>
    public class QField
    {

        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public QField()
        {
            try
            {
                Elements = new List<QElement>();
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

        public int Index { get; set; }
        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }
       
        /// <summary>
        /// element of field
        /// </summary>
        public List<QElement> Elements { get; set; }
        #endregion
    }
}
