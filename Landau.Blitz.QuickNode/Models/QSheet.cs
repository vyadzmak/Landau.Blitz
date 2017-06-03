using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.QuickNode.Models
{
    /// <summary>
    /// sheet
    /// </summary>
    public class QSheet
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public QSheet()
        {
            try
            {
                Blocks = new List<QBlock>();
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
        /// index
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// name of the sheet
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// blocks
        /// </summary>
        public List<QBlock> Blocks { get; set; }
        #endregion
    }
}
