using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Wordprocessing;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.Exporter.Models.TableModels;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class GenerateTableHelper
    {
        private static TableCell CreateCell(string content, ReportSchemaElement element)
        {
            var runProperties = new RunProperties();

            switch (element.FontStyle)
            {
                case FontStyles.Bold:
                    runProperties.Bold = new Bold();
                    break;

                case FontStyles.Italic:
                    runProperties.Italic = new Italic();
                    break;

                case FontStyles.UnderLine:
                    runProperties.Underline = new Underline();
                    break;

                case FontStyles.BoldItalic:
                    runProperties.Bold = new Bold();
                    runProperties.Italic = new Italic();

                    break;
            }

            var fonts = new RunFonts();

            switch (element.FontFamily)
            {
                case FontFamilies.Arial:
                    //   family.Val = new EnumValue<FontFamilyValues>(aria);
                    fonts.Ascii = "Arial";
                    fonts.HighAnsi = "Arial";
                    break;

                case FontFamilies.Calibri:
                    fonts.Ascii = "Calibri";
                    fonts.HighAnsi = "Calibri";
                    break;

                case FontFamilies.TimesNewRoman:
                    fonts.Ascii = "Times New Roman";
                    fonts.HighAnsi = "Times New Roman";
                    break;
            }

            runProperties.Append(fonts);
            var size = new FontSize();
            var sz = (double)element.FontSize * 2;
            size.Val = sz.ToString();
            runProperties.Append(size);

            
            Text text = new Text(content);

            Run run = new Run();
            run.Append(runProperties);
            run.Append(text);

            Paragraph p = new Paragraph();
            p.Append(run);
            TableCell cell = new TableCell();
            cell.Append(p);

            return cell;
            //return new TableCell(new Paragraph(new Run(new Text(text))));
        }

        private static void SetTableStyle(Table table)
        {
            TableProperties properties = new TableProperties();

            //table borders
            TableBorders borders = new TableBorders();

            borders.TopBorder = new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single) };
            borders.BottomBorder = new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single) };
            borders.LeftBorder = new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single) };
            borders.RightBorder = new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.Single) };
            borders.InsideHorizontalBorder = new InsideHorizontalBorder() { Val = BorderValues.Single };
            borders.InsideVerticalBorder = new InsideVerticalBorder() { Val = BorderValues.Single };

            properties.Append(borders);

            //set the table width to page width
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };
            properties.Append(tableWidth);

            //add properties to table
            table.Append(properties);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="body"></param>
        public static void GenerateTable(object project, Body body, ReportSchemaElement element)
        {
            try
            {
                XTable xTable = ParseTableHelper.ParseTable(project, element);

                Table table = null;
                TableRow row = null;


                //create table
                table = new Table();

                SetTableStyle(table);

                //add first row with title            
                row = new TableRow();
                if (xTable.Rows.Count > 0)
                {
                    XRow xRow = xTable.Rows[0];
                    foreach (var xRowCell in xRow.Cells)
                    {
                        row.Append(CreateCell(xRowCell.Text,element));

                    }
                    table.Append(row);


                    if (xTable.Rows.Count > 1)
                    {
                        for (int rowNumber = 1; rowNumber < xTable.Rows.Count; rowNumber++)
                        {
                            row = new TableRow();
                            XRow cRow = xTable.Rows[rowNumber];
                            foreach (var c in cRow.Cells)
                            {
                                row.Append(CreateCell(c.Text,element));
                            }
                            table.Append(row);
                        }
                    }
                    body.Append(table);
                }

            }
            catch (Exception e)
            {

            }
        }
    }
}

