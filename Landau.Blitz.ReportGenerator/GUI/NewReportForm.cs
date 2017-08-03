using System;
using System.Windows.Forms;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.ReportGenerator.DBHelpers;

namespace Landau.Blitz.ReportGenerator.GUI
{
    public partial class NewReportForm : Form
    {

        public ReportSchemaModel NewReportSchema = new ReportSchemaModel();
        #region constructor

        /// <summary>
        ///     constructor
        /// </summary>
        public NewReportForm()
        {
            InitializeComponent();
        }

        #endregion

        #region methods

        /// <summary>
        ///     load form
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void NewReportForm_Load(object sender, EventArgs e)
        {
            try
            {
                NewReportSchema = new ReportSchemaModel();
                NewReportSchema.UserId = 1;
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnCancel_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception exception)
            {
            }
        }
        
        /// <summary>
        /// new report name
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void txtNewReportName_TextChanged(object sender, EventArgs e)
        {
            try
            {
                NewReportSchema.Name = txtNewReportName.Text;
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// ok method
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnOk_Click(object sender, EventArgs e)
        {
            try
            {
                NewReportSchema = DBReportHelper.AddTemplate(NewReportSchema);
                this.Cursor = Cursors.WaitCursor;
                Program.MainForm.CurrentReport = NewReportSchema;
                this.Cursor = Cursors.Default;
                this.Close();
            }
            catch (Exception exception)
            {
            }
        }
    }

    #endregion
}