using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class GenerateDocumentHelper
    {
        /// <summary>
        /// GENERATE TEXT DOCUMENT
        /// </summary>
        public static WordprocessingDocument GenerateDocument(string path)
        {
            try
            {

                // Create a Wordprocessing document. 
                WordprocessingDocument package =
                    WordprocessingDocument.Create(path, WordprocessingDocumentType.Document);
                
                    // Add a new main document part. 
                    package.AddMainDocumentPart();

                    // Create the Document DOM. 
                    package.MainDocumentPart.Document =
                        new Document(
                            new Body(
                                ));

                return package;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message+" "+e.InnerException.Message);
                return null;
            }
        }
    }
}
