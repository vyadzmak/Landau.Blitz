using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.QuickNode.Models
{
    public class QBlock
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public QBlock()
        {
            try
            {
                Questions = new List<QQuestion>();
            }
            catch (Exception e)
            {
                
            }
        }
        #endregion

        #region fields
        
        public string Title { get; set; }
        /// <summary>
        /// questions
        /// </summary>
        public List<QQuestion> Questions { get; set; }
        #endregion
    }

}
