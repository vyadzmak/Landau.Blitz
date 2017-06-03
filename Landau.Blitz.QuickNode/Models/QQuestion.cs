using System;
using System.Collections.Generic;

namespace Landau.Blitz.QuickNode.Models
{
    /// <summary>
    /// question
    /// </summary>
    public class QQuestion
    {

        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public QQuestion()
        {
            try
            {
                Fields = new List<QField>();
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
        /// fields
        /// </summary>
        public List<QField> Fields { get; set; }

       
        #endregion
    }
}
