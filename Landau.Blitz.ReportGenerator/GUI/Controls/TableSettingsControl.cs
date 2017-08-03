using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;

namespace Landau.Blitz.ReportGenerator.GUI.Controls
{
    public partial class TableSettingsControl : UserControl
    {
        private bool isLoading = true;
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public TableSettingsControl()
        {
            InitializeComponent();
            txtElementName.Text = Program.MainForm.CurrentElement.Name;
            cbFontSize.DataSource = Enum.GetValues(typeof(FontSizes));
            cbFontSize.SelectedItem = Program.MainForm.CurrentElement.FontSize;

            cbTextAlign.DataSource = Enum.GetValues(typeof(TextAlign));
            cbTextAlign.SelectedItem = Program.MainForm.CurrentElement.TextAlign;

            cbFontStyle.DataSource = Enum.GetValues(typeof(FontStyles));
            cbFontStyle.SelectedItem = Program.MainForm.CurrentElement.FontStyle;

            cbFontFamily.DataSource = Enum.GetValues(typeof(FontFamilies));
            cbFontFamily.SelectedItem = Program.MainForm.CurrentElement.FontFamily;

            string fColor = Program.MainForm.CurrentElement.ForegroundColor;
            if (fColor[0] != '#') fColor = "#" + fColor;

            string bColor = Program.MainForm.CurrentElement.BackgroundColor;
            if (bColor[0] != '#') bColor = "#" + bColor;

            lblForegroundColor.BackColor = System.Drawing.ColorTranslator.FromHtml(fColor);
            lblBackgroundColor.BackColor = System.Drawing.ColorTranslator.FromHtml(bColor);

            rtbContent.Text = Program.MainForm.CurrentElement.Text;
            isLoading = false;
        }
        #endregion

        #region methods GUI
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnForegroundColor_Click(object sender, EventArgs e)
        {
            try
            {
                colorPicker.Color = lblForegroundColor.BackColor;
                if (colorPicker.ShowDialog() == DialogResult.OK)
                {
                    String code = (colorPicker.Color.ToArgb() & 0x00FFFFFF).ToString("X6");
                    Program.MainForm.CurrentElement.ForegroundColor = code;
                    lblForegroundColor.Text = code;
                    lblForegroundColor.BackColor = colorPicker.Color;

                }
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// back color
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnBackgroundColor_Click(object sender, EventArgs e)
        {
            colorPicker.Color = lblBackgroundColor.BackColor;
            if (colorPicker.ShowDialog() == DialogResult.OK)
            {
                String code = (colorPicker.Color.ToArgb() & 0x00FFFFFF).ToString("X6");
                Program.MainForm.CurrentElement.BackgroundColor = code;
                lblBackgroundColor.Text = code;
                lblBackgroundColor.BackColor = colorPicker.Color;

            }
        }




        /// <summary>
        /// font sizes
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void cbFontSize_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (!isLoading)
                    Program.MainForm.CurrentElement.FontSize = (FontSizes)Enum.Parse(typeof(FontSizes), cbFontSize.SelectedItem.ToString());
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// text align
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void cbTextAlign_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (!isLoading)
                    Program.MainForm.CurrentElement.TextAlign = (TextAlign)Enum.Parse(typeof(TextAlign), cbTextAlign.SelectedItem.ToString());
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// font styles
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void cbFontStyle_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (!isLoading)
                    Program.MainForm.CurrentElement.FontStyle = (FontStyles)Enum.Parse(typeof(FontStyles), cbFontStyle.SelectedItem.ToString());
            }
            catch (Exception exception)
            {
            }
        }
        /// <summary>
        ///font family
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void cbFontFamily_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (!isLoading)
                    Program.MainForm.CurrentElement.FontFamily = (FontFamilies)Enum.Parse(typeof(FontFamilies), cbFontFamily.SelectedItem.ToString());
            }
            catch (Exception exception)
            {
            }
        }

        private void rtbContent_TextChanged(object sender, EventArgs e)
        {
            try
            {
                Program.MainForm.CurrentElement.Text = rtbContent.Text;
            }
            catch (Exception exception)
            {

            }
        }

        #endregion
    }
}
