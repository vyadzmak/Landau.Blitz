using System;
using DocumentFormat.OpenXml.Wordprocessing;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class GenerateParagraphHelper
    {
        /// <summary>
        /// generate paragraph method
        /// </summary>
        /// <param name="body"></param>
        /// <param name="element"></param>
        /// <param name="content"></param>
        public static void GenerateParagraph(Body body, ReportSchemaElement element, string content)
        {
            try
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
                var sz = (double) element.FontSize * 2;
                size.Val = sz.ToString();
                runProperties.Append(size);

                var spacing = new SpacingBetweenLines
                {
                    Line = "240",
                    LineRule = LineSpacingRuleValues.Auto,
                    Before = "0",
                    After = "0"
                };

                var paragraphProperties1 = new ParagraphProperties();

                var shading =
                    new Shading
                    {
                        Color = "#" + element.ForegroundColor,
                        Fill = "#" + element.BackgroundColor,
                        Val = ShadingPatternValues.Clear
                    };
                paragraphProperties1.Append(shading);
                paragraphProperties1.Append(spacing);
                var just = JustificationValues.Left;

                switch (element.TextAlign)
                {
                    case TextAlign.Center:
                        just = JustificationValues.Center;
                        break;

                    case TextAlign.Right:
                        just = JustificationValues.Right;
                        break;
                }

                var justification1 = new Justification {Val = just};
                paragraphProperties1.Append(justification1);
                var run = new Run();
                run.Append(runProperties);
                var text = new Text(content);
                run.Append(text);
                var paragraph = new Paragraph();
                paragraph.Append(paragraphProperties1);
                paragraph.Append(run);
                body.Append(paragraph);
            }
            catch (Exception e)
            {
            }
        }
    }
}