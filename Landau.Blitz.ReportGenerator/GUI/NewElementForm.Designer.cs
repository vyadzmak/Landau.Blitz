namespace Landau.Blitz.ReportGenerator.GUI
{
    partial class NewElementForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(NewElementForm));
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnCancel = new System.Windows.Forms.Button();
            this.btnOk = new System.Windows.Forms.Button();
            this.panelSelector = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.txtNewReportName = new System.Windows.Forms.TextBox();
            this.gbTypeElement = new System.Windows.Forms.GroupBox();
            this.rbParagraph = new System.Windows.Forms.RadioButton();
            this.rbTable = new System.Windows.Forms.RadioButton();
            this.panel1.SuspendLayout();
            this.panelSelector.SuspendLayout();
            this.gbTypeElement.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btnCancel);
            this.panel1.Controls.Add(this.btnOk);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 157);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(373, 35);
            this.panel1.TabIndex = 5;
            // 
            // btnCancel
            // 
            this.btnCancel.Location = new System.Drawing.Point(210, 5);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(75, 23);
            this.btnCancel.TabIndex = 1;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // btnOk
            // 
            this.btnOk.Location = new System.Drawing.Point(291, 5);
            this.btnOk.Name = "btnOk";
            this.btnOk.Size = new System.Drawing.Size(75, 23);
            this.btnOk.TabIndex = 0;
            this.btnOk.Text = "OK";
            this.btnOk.UseVisualStyleBackColor = true;
            this.btnOk.Click += new System.EventHandler(this.btnOk_Click);
            // 
            // panelSelector
            // 
            this.panelSelector.Controls.Add(this.gbTypeElement);
            this.panelSelector.Controls.Add(this.label1);
            this.panelSelector.Controls.Add(this.txtNewReportName);
            this.panelSelector.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelSelector.Location = new System.Drawing.Point(0, 0);
            this.panelSelector.Name = "panelSelector";
            this.panelSelector.Size = new System.Drawing.Size(373, 157);
            this.panelSelector.TabIndex = 4;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(9, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(101, 13);
            this.label1.TabIndex = 4;
            this.label1.Text = "New Element Name";
            // 
            // txtNewReportName
            // 
            this.txtNewReportName.Location = new System.Drawing.Point(12, 28);
            this.txtNewReportName.Name = "txtNewReportName";
            this.txtNewReportName.Size = new System.Drawing.Size(354, 20);
            this.txtNewReportName.TabIndex = 5;
            this.txtNewReportName.TextChanged += new System.EventHandler(this.txtNewReportName_TextChanged);
            // 
            // gbTypeElement
            // 
            this.gbTypeElement.Controls.Add(this.rbTable);
            this.gbTypeElement.Controls.Add(this.rbParagraph);
            this.gbTypeElement.Location = new System.Drawing.Point(12, 57);
            this.gbTypeElement.Name = "gbTypeElement";
            this.gbTypeElement.Size = new System.Drawing.Size(354, 100);
            this.gbTypeElement.TabIndex = 6;
            this.gbTypeElement.TabStop = false;
            this.gbTypeElement.Text = "Select Element Type";
            // 
            // rbParagraph
            // 
            this.rbParagraph.AutoSize = true;
            this.rbParagraph.Checked = true;
            this.rbParagraph.Location = new System.Drawing.Point(6, 19);
            this.rbParagraph.Name = "rbParagraph";
            this.rbParagraph.Size = new System.Drawing.Size(74, 17);
            this.rbParagraph.TabIndex = 0;
            this.rbParagraph.TabStop = true;
            this.rbParagraph.Text = "Paragraph";
            this.rbParagraph.UseVisualStyleBackColor = true;
            this.rbParagraph.CheckedChanged += new System.EventHandler(this.rbParagraph_CheckedChanged);
            // 
            // rbTable
            // 
            this.rbTable.AutoSize = true;
            this.rbTable.Location = new System.Drawing.Point(7, 42);
            this.rbTable.Name = "rbTable";
            this.rbTable.Size = new System.Drawing.Size(52, 17);
            this.rbTable.TabIndex = 1;
            this.rbTable.TabStop = true;
            this.rbTable.Text = "Table";
            this.rbTable.UseVisualStyleBackColor = true;
            this.rbTable.CheckedChanged += new System.EventHandler(this.rbTable_CheckedChanged);
            // 
            // NewElementForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(373, 192);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.panelSelector);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "NewElementForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "New Element";
            this.Shown += new System.EventHandler(this.NewElementForm_Shown);
            this.panel1.ResumeLayout(false);
            this.panelSelector.ResumeLayout(false);
            this.panelSelector.PerformLayout();
            this.gbTypeElement.ResumeLayout(false);
            this.gbTypeElement.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.Button btnOk;
        private System.Windows.Forms.Panel panelSelector;
        private System.Windows.Forms.GroupBox gbTypeElement;
        private System.Windows.Forms.RadioButton rbParagraph;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtNewReportName;
        private System.Windows.Forms.RadioButton rbTable;
    }
}