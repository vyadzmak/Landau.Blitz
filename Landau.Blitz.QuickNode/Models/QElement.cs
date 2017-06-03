using System;
using Landau.Blitz.QuickNode.Models.GeneralModels;

namespace Landau.Blitz.QuickNode.Models
{
    /// <summary>
    /// QElement
    /// </summary>
    public class QElement
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public QElement()
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
        /// id element
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// index
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// UI type
        /// </summary>
        public ElementUiType ElementUiType { get; set; }
        /// <summary>
        /// field type
        /// </summary>
        public ElementVarType ElementVarType { get; set; }
        
        /// <summary>
        /// UI Element
        /// </summary>
        public object UIElement { get; set; }
        #endregion

    }
}
