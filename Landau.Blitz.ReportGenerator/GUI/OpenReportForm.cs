using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Landau.Blitz.Exporter.Helpers;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.ReportGenerator.DB;
using Landau.Blitz.ReportGenerator.DBHelpers;

namespace Landau.Blitz.ReportGenerator.GUI
{
    public partial class OpenReportForm : Form
    {
        private List<ReportTemplates> reports = null;

        private ReportTemplates currentReport = null;
        public OpenReportForm()
        {
            InitializeComponent();
        }

        /// <summary>
        /// open report form
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OpenReportForm_Shown(object sender, EventArgs e)
        {
            try
            {
                this.Cursor = Cursors.WaitCursor;
                reports = DBReportHelper.GetToAllReportTemplates();

                foreach (var template in reports)
                {
                    lbReports.Items.Add(template.Name);
                    
                }

                if (lbReports.Items.Count > 0)
                {
                    lbReports.SelectedIndex = 0;
                    currentReport = reports[0];
                }
                this.Cursor = Cursors.Default;
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// close form
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// btn OK event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnOk_Click(object sender, EventArgs e)
        {
            try
            {
                if (currentReport != null)
                {

                    ReportSchemaModel model = SerializeHelper.DeserializeReportSchema(currentReport.Template);
                    Program.MainForm.CurrentReport = model;
                    Program.MainForm.RefreshList();
                    Program.MainForm.Text = "Blitz Reports Generator +["+model.Name + "]";
                    this.Close();
                }
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// select changes
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void lbReports_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                currentReport = reports[lbReports.SelectedIndex];
            }
            catch (Exception exception)
            {
            }
        }
    }
}
