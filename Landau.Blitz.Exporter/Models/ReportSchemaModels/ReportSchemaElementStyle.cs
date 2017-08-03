using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Landau.Blitz.Exporter.Models.ReportSchemaModels
{

    /// <summary>
    /// font style
    /// </summary>
    public enum FontStyles { Normal, Bold, Italic, BoldItalic, UnderLine}

    /// <summary>
    /// text align
    /// </summary>
    public enum TextAlign { Left, Center, Right}

    public enum FontSizes {FS8 = 8, FS9 = 9, FS10 = 10, FS11 = 11, FS12 = 12, FS13 = 13, FS14 = 14, FS15 = 15, FS16 = 16, FS17 = 17, FS18 = 18, FS20=20 }
    
    /// <summary>
    /// font families
    /// </summary>
    public enum FontFamilies { Arial, Calibri, TimesNewRoman }
    /// <summary>
    /// 
    /// </summary>
    public class ReportSchemaElementStyle
    {
       
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public ReportSchemaElementStyle()
        {
            try
            {
                //generate default style
                FontStyle = FontStyles.Normal;
                FontSize = FontSizes.FS12;;
                TextAlign = TextAlign.Left;
                ForegroundColor = "#000000";
                BackgroundColor = "#FFFFFF";
                FontFamily = FontFamilies.Arial;

            }
            catch (Exception e)
            {
            }
        }
        #endregion

        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// font style
        /// </summary>
        public FontStyles FontStyle { get; set; }

        /// <summary>
        /// text align
        /// </summary>
        public TextAlign TextAlign { get; set; }

        /// <summary>
        /// font siaze
        /// </summary>
        public FontSizes FontSize { get; set; }

        /// <summary>
        /// text color 
        /// </summary>
        public string ForegroundColor { get; set; }

        /// <summary>
        /// background color
        /// </summary>
        public string BackgroundColor { get; set; }

        /// <summary>
        /// font name
        /// </summary>
        public FontFamilies FontFamily { get; set; }
    }
}
