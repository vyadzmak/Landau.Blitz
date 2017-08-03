using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Models.ReportSchemaModels
{
    public class ReportSchemaModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public ReportSchemaModel()
        {
            try
            {
                Elements = new List<ReportSchemaElement>();
                DefaultElementStyle = new ReportSchemaElement() {Id=1, Name = "Default Style"};

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
        /// name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// creation time
        /// </summary>
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// update time
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// user id
        /// </summary>
        public int UserId { get; set; }

        public ReportSchemaElementStyle DefaultElementStyle { get; set; }

        /// <summary>
        /// elements
        /// </summary>
        public List<ReportSchemaElement> Elements { get; set; }

        /// <summary>
        /// style of reports
        /// </summary>
        public List<ReportSchemaElementStyle> Styles { get; set; }
        #endregion
    }
}
