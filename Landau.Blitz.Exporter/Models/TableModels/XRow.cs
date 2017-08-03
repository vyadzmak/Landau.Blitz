using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Models.TableModels
{
    public class XRow
    {
        public XRow()
        {
            try
            {
                Cells = new List<XCell>();
            }
            catch (Exception e)
            {
            }
        }

        public int Index { get; set; }

        public List<XCell> Cells { get; set; }
    }
}
