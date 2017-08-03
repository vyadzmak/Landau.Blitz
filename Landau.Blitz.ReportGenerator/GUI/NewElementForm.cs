using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;

namespace Landau.Blitz.ReportGenerator.GUI
{
    public partial class NewElementForm : Form
    {
        ReportSchemaElement NewReportSchemaElement =new ReportSchemaElement();
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public NewElementForm()
        {
            InitializeComponent();
        }
        #endregion
        #region methods
        /// <summary>
        /// cancel btn
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void NewElementForm_Shown(object sender, EventArgs e)
        {
            try
            {
                NewReportSchemaElement = new ReportSchemaElement();
                NewReportSchemaElement.ElementType = ElementType.Paragraph;
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// rb paragraph checked
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void rbParagraph_CheckedChanged(object sender, EventArgs e)
        {
            try
            {
                if (rbParagraph.Checked)
                {
                    NewReportSchemaElement.ElementType = ElementType.Paragraph;
                }
                else
                {
                    NewReportSchemaElement.ElementType = ElementType.Table;
                }
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// rb table checked
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void rbTable_CheckedChanged(object sender, EventArgs e)
        {
            try
            {
                if (rbTable.Checked)
                {
                    NewReportSchemaElement.ElementType = ElementType.Table;
                }
                else
                {
                    NewReportSchemaElement.ElementType = ElementType.Paragraph;
                }
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// btn ok event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnOk_Click(object sender, EventArgs e)
        {
            try
            {
                if (!string.IsNullOrEmpty(NewReportSchemaElement.Name))
                {
                    Program.MainForm.CurrentReport.Elements.Add(NewReportSchemaElement);
                    Program.MainForm.RefreshList();
                   
                    this.Close();
                }
                else
                {
                    MessageBox.Show(this, "Name must be filled", "Empty Name", MessageBoxButtons.OK,
                        MessageBoxIcon.Warning);
                }
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// change name
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void txtNewReportName_TextChanged(object sender, EventArgs e)
        {
            try
            {
                NewReportSchemaElement.Name = txtNewReportName.Text;
            }
            catch (Exception exception)
            {
            }
        }
        #endregion


    }
}

