using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Models.TableModels
{
    public class XTable
    {
        public XTable()
        {
            try
            {
                Rows = new List<XRow>();
                Loop = false;
            }
            catch (Exception e)
            {
            }
        }
        
        public bool Loop { get; set; }
        public List<XRow> Rows { get; set; }


    }
}
