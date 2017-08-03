using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Models.ReportSchemaModels
{
    public class ReportSchemaElement:ReportSchemaElementStyle
    {
        public int Index { get; set; }
        /// <summary>
        /// name of element
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// text
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// element type
        /// </summary>
        public ElementType ElementType { get; set; }

        

    }
}
