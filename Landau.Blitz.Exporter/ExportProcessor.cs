using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;


namespace Landau.Blitz.Exporter
{
    public class ExportProcessor
    {
        private System.Web.Script.Serialization.JavaScriptSerializer serializer;

        public static void OpenAndAddTextToWordDocument(string filepath, string txt)
        {
            // Open a WordprocessingDocument for editing using the filepath.
            WordprocessingDocument wordprocessingDocument =
                WordprocessingDocument.Open(filepath, true);

            // Assign a reference to the existing document body.
            Body body = wordprocessingDocument.MainDocumentPart.Document.Body;

            // Add new text.
            Paragraph para = body.AppendChild(new Paragraph());
            Run run = para.AppendChild(new Run());
            run.AppendChild(new Text(txt));

            // Close the handle explicitly.
            wordprocessingDocument.Close();
        }

        public FileStream CreateTestDocument(string path)
        {
            try
            {
                string fileName = "test.docx";
                path = Path.Combine(path, fileName);
                // Create a Wordprocessing document. 
                using (WordprocessingDocument package = WordprocessingDocument.Create(path, WordprocessingDocumentType.Document))
                {
                    // Add a new main document part. 
                    package.AddMainDocumentPart();
                   
                    Text head = new Text();

                    // Create the Document DOM. 
                    package.MainDocumentPart.Document =
                      new Document(
                        new Body(
                          new Paragraph(
                            new Run(
                              new Text("Hello World!")))));

                    // Save changes to the main document part. 
                    package.MainDocumentPart.Document.Save();

                    using (FileStream fs = File.Open(path, FileMode.Open))
                    {

                        return fs;
                    }

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw e;
            }
        }

        public void InserTable(string filepath)
        {
            try
            {
                // Open a WordprocessingDocument for editing using the filepath.
                WordprocessingDocument wordprocessingDocument =
                    WordprocessingDocument.Open(filepath, true);
                // Create an empty table.
                Table table = new Table();

                // Create a TableProperties object and specify its border information.
                TableProperties tblProp = new TableProperties(
                    new TableBorders(
                        new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 },
                        new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 },
                        new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 },
                        new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 },
                        new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 },
                        new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 24 }
                    )
                );
                // Append the TableProperties object to the empty table.
                table.AppendChild<TableProperties>(tblProp);

                // Create a row.
                TableRow tr = new TableRow();

                // Create a cell.
                TableCell tc1 = new TableCell();

                // Specify the width property of the table cell.
                tc1.Append(new TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Dxa, Width = "2400" }));

                // Specify the table cell content.
                tc1.Append(new Paragraph(new Run(new Text("Hello, World!"))));

                // Append the table cell to the table row.
                tr.Append(tc1);

                // Create a second table cell by copying the OuterXml value of the first table cell.
                TableCell tc2 = new TableCell(tc1.OuterXml);

                // Append the table cell to the table row.
                tr.Append(tc2);

                // Append the table row to the table.
                table.Append(tr);
                wordprocessingDocument.MainDocumentPart.Document.Body.Append(table);
                wordprocessingDocument.MainDocumentPart.Document.Save();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public void GenerateDocument()
        {
            try
            {
                InserTable("D://test266.docx");
                // Create a Wordprocessing document. 
                //using (WordprocessingDocument package = WordprocessingDocument.Create("D://test266.docx", WordprocessingDocumentType.Document))
                //{
                //    // Add a new main document part. 
                //    package.AddMainDocumentPart();

                //    // Create the Document DOM. 
                //    package.MainDocumentPart.Document =
                //        new Document(
                //            new Body(
                //                new Paragraph(
                //                    new Run(
                //                        new Text("Hello World!")))));

                //    // Save changes to the main document part. 
                //    package.MainDocumentPart.Document.Save();
                //}
                // OpenAndAddTextToWordDocument("D:\\test266.docx","HELLO FUCKING NIGGERS!");
                //using (WordprocessingDocument doc = WordprocessingDocument.Create
                //    ("D:\\test11.docx", DocumentFormat.OpenXml.WordprocessingDocumentType.Document))
                //{
                //    // Add a main document part.
                //    MainDocumentPart mainPart = doc.AddMainDocumentPart();

                //    // Create the document structure and add some text.
                //    mainPart.Document = new Document();
                //    Body body = mainPart.Document.AppendChild(new Body());
                //    Paragraph para = body.AppendChild(new Paragraph());
                //    Run run = para.AppendChild(new Run());

                //    // String msg contains the text, "Hello, Word!"
                //    run.AppendChild(new Text("New text in document"));
                //}
            }
            catch (Exception e)
            {
                
            }
        }

        private object ParseTemplate(string templateString)
        {
            return serializer.Deserialize<object>(templateString);
        }

        private object ParseProjectJson(string projectString)
        {
            return serializer.Deserialize<Dictionary<string, object>>(projectString);
        }

        private string GetValueFromResumeTree(Dictionary<string, object> tree)
        {
            try
            {
                foreach (var item in tree)
                {
                    
                }

                return "";
            }
            catch (Exception exception)
            {
                Console.WriteLine();
                throw;
            }
        }

        public ExportProcessor()
        {
            //serializer = new JavaScriptSerializer();
            //Helpers.ResumeStaticInfo.ResumeFields = fields;
        }
    }
}
