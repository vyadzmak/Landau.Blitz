using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Landau.Blitz.Exporter;

namespace Landau.Blitz.TestExporter
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Exporter.ExportProcessor processor = new ExportProcessor();
                processor.GenerateDocument();
            }
            catch (Exception e)
            {
            }
        }
    }
}
