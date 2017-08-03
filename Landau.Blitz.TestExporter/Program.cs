using System;
using System.Collections.Generic;
using System.IO;
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
                string directoryName = AppDomain.CurrentDomain.BaseDirectory;
                string resultDir = Path.Combine(directoryName, "data");
                if (!Directory.Exists(resultDir)) Directory.CreateDirectory(resultDir);
                processor.GenerateReport(resultDir,"", "");

                Console.ReadKey();

            }
            catch (Exception e)
            {
            }
        }
    }
}
