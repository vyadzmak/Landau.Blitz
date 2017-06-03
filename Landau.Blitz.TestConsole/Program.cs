using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Landau.Blitz.QuickNode;

namespace Landau.Blitz.TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                QuickNode.Processor processor = new Processor();
                processor.DoIt();
            }
            catch (Exception e)
            {
            }
        }
    }
}
