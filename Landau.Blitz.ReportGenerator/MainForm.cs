using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Landau.Blitz.Exporter;
using Landau.Blitz.Exporter.Helpers;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.ReportGenerator.DBHelpers;
using Landau.Blitz.ReportGenerator.GUI;
using Landau.Blitz.ReportGenerator.GUI.Controls;

namespace Landau.Blitz.ReportGenerator
{
    public partial class MainForm : Form
    {
        /// <summary>
        /// current report
        /// </summary>
        public ReportSchemaModel CurrentReport;

        /// <summary>
        /// current element
        /// </summary>
        public ReportSchemaElement CurrentElement;
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public MainForm()
        {
            InitializeComponent();
        }
        #endregion

        #region methods GUI
        /// <summary>
        /// new form
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void newReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                NewReportForm form = new NewReportForm();
                form.Show();
                
            }
            catch (Exception exception)
            {
            }
        }

        /// <summary>
        /// open report form
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void openReportToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                OpenReportForm form = new OpenReportForm();
                form.Show();
            }
            catch (Exception exception)
            {

            }
        }


        /// <summary>
        /// exit 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                var r = MessageBox.Show(this,  "You are really want exit?", "Exit", MessageBoxButtons.YesNo,
                    MessageBoxIcon.Information);

                if (r == DialogResult.Yes)
                {
                    Application.Exit();
                }
            }
            catch (Exception exception)
            {
            }
        }


        /// <summary>
        /// add element
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void tsbAddElement_Click(object sender, EventArgs e)
        {
            try
            {
                NewElementForm form = new NewElementForm();
                form.Show();
            }
            catch (Exception exception)
            {
            }
        }

        private void debugToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                ExportProcessor processor = new ExportProcessor();
                string content = DBProjectHelper.GetProjectById(496);
                string path = @"d:\Projects\Github\Landau.Blitz\Landau.Blitz\Landau.Blitz.TestExporter\bin\Debug\data\";
                processor.GenerateReport(path,SerializeHelper.Serialize(CurrentReport),content);
            }
            catch (Exception exception)
            {
            }
        }

        #endregion

        #region methods

        /// <summary>
        /// refresh
        /// </summary>
        public  void RefreshList(int selectedIndex =-1)
        {
            try
            {
                if (CurrentReport.Elements == null)
                {
                    elementsPanel.Enabled = false;
                    settingPanel.Enabled = false;
                    return;
                }

                elementsPanel.Enabled = true;
                settingPanel.Enabled = true;
                lbElements.Items.Clear();
                foreach (var element in CurrentReport.Elements)
                {
                    lbElements.Items.Add(element.Name);
                }

                if (selectedIndex == -1)
                {
                    lbElements.SelectedIndex = lbElements.Items.Count - 1;
                }
            }
            catch (Exception e)
            {
            }
        }

        /// <summary>
        /// save schema
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void saveReportSchemaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                DBReportHelper.UpdateTemplate(CurrentReport);
                MessageBox.Show("Done");
            }
            catch (Exception exception)
            {

            }
        }

        /// <summary>
        /// select element
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void lbElements_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                //MessageBox.Show(Convert.ToString();
                var t = CurrentReport.Elements[lbElements.SelectedIndex].ElementType;
                CurrentElement = CurrentReport.Elements[lbElements.SelectedIndex];

                switch (t)
                {
                        case ElementType.Paragraph:
                        settingPanel.Controls.Clear();
                        settingPanel.Controls.Add(new FieldSettingsControl());
                        break;

                        case ElementType.Table:
                            settingPanel.Controls.Clear();
                            settingPanel.Controls.Add(new TableSettingsControl());

                        break;
                }
            }
            catch (Exception exception)
            {
            }
        }

        #endregion

      
    }
}
