using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.QuickNode.Models.UIModels
{
    public class UIDropDownElement:UIElement
    {
        public UIDropDownElement(int selectedValueIndex, List<string> values)
        {
            try
            {
                Values = new List<string>();
                Values = values;
            }
            catch (Exception e)
            {
                
            }
        }

        public string Name { get; set; }
        public List<string> Values { get; set; }
    }
}

