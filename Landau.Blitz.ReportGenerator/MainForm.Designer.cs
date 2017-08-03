namespace Landau.Blitz.ReportGenerator
{
    partial class MainForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.newReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.openReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveReportSchemaToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripSeparator();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.debugToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.elementsPanel = new System.Windows.Forms.Panel();
            this.lbElements = new System.Windows.Forms.ListBox();
            this.ts = new System.Windows.Forms.ToolStrip();
            this.tsbAddElement = new System.Windows.Forms.ToolStripButton();
            this.tsbRemoveElement = new System.Windows.Forms.ToolStripButton();
            this.tsbElementUp = new System.Windows.Forms.ToolStripButton();
            this.tsbElementDown = new System.Windows.Forms.ToolStripButton();
            this.settingPanel = new System.Windows.Forms.Panel();
            this.menuStrip1.SuspendLayout();
            this.elementsPanel.SuspendLayout();
            this.ts.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.debugToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(727, 24);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "ms";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newReportToolStripMenuItem,
            this.openReportToolStripMenuItem,
            this.saveReportSchemaToolStripMenuItem,
            this.toolStripMenuItem1,
            this.exitToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // newReportToolStripMenuItem
            // 
            this.newReportToolStripMenuItem.Name = "newReportToolStripMenuItem";
            this.newReportToolStripMenuItem.Size = new System.Drawing.Size(186, 22);
            this.newReportToolStripMenuItem.Text = "New Report Schema";
            this.newReportToolStripMenuItem.Click += new System.EventHandler(this.newReportToolStripMenuItem_Click);
            // 
            // openReportToolStripMenuItem
            // 
            this.openReportToolStripMenuItem.Name = "openReportToolStripMenuItem";
            this.openReportToolStripMenuItem.Size = new System.Drawing.Size(186, 22);
            this.openReportToolStripMenuItem.Text = "Open Report Schema";
            this.openReportToolStripMenuItem.Click += new System.EventHandler(this.openReportToolStripMenuItem_Click);
            // 
            // saveReportSchemaToolStripMenuItem
            // 
            this.saveReportSchemaToolStripMenuItem.Name = "saveReportSchemaToolStripMenuItem";
            this.saveReportSchemaToolStripMenuItem.Size = new System.Drawing.Size(186, 22);
            this.saveReportSchemaToolStripMenuItem.Text = "Save Report Schema";
            this.saveReportSchemaToolStripMenuItem.Click += new System.EventHandler(this.saveReportSchemaToolStripMenuItem_Click);
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(183, 6);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(186, 22);
            this.exitToolStripMenuItem.Text = "Exit";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
            // 
            // debugToolStripMenuItem
            // 
            this.debugToolStripMenuItem.Name = "debugToolStripMenuItem";
            this.debugToolStripMenuItem.Size = new System.Drawing.Size(54, 20);
            this.debugToolStripMenuItem.Text = "Debug";
            this.debugToolStripMenuItem.Click += new System.EventHandler(this.debugToolStripMenuItem_Click);
            // 
            // elementsPanel
            // 
            this.elementsPanel.Controls.Add(this.lbElements);
            this.elementsPanel.Controls.Add(this.ts);
            this.elementsPanel.Dock = System.Windows.Forms.DockStyle.Left;
            this.elementsPanel.Enabled = false;
            this.elementsPanel.Location = new System.Drawing.Point(0, 24);
            this.elementsPanel.Name = "elementsPanel";
            this.elementsPanel.Size = new System.Drawing.Size(200, 364);
            this.elementsPanel.TabIndex = 1;
            // 
            // lbElements
            // 
            this.lbElements.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lbElements.FormattingEnabled = true;
            this.lbElements.Location = new System.Drawing.Point(0, 25);
            this.lbElements.Name = "lbElements";
            this.lbElements.Size = new System.Drawing.Size(200, 339);
            this.lbElements.TabIndex = 4;
            this.lbElements.SelectedIndexChanged += new System.EventHandler(this.lbElements_SelectedIndexChanged);
            // 
            // ts
            // 
            this.ts.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbAddElement,
            this.tsbRemoveElement,
            this.tsbElementUp,
            this.tsbElementDown});
            this.ts.Location = new System.Drawing.Point(0, 0);
            this.ts.Name = "ts";
            this.ts.Size = new System.Drawing.Size(200, 25);
            this.ts.TabIndex = 0;
            this.ts.Text = "ts";
            // 
            // tsbAddElement
            // 
            this.tsbAddElement.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAddElement.Image = ((System.Drawing.Image)(resources.GetObject("tsbAddElement.Image")));
            this.tsbAddElement.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAddElement.Name = "tsbAddElement";
            this.tsbAddElement.Size = new System.Drawing.Size(23, 22);
            this.tsbAddElement.Text = "tsbAddElement";
            this.tsbAddElement.ToolTipText = "Add Element";
            this.tsbAddElement.Click += new System.EventHandler(this.tsbAddElement_Click);
            // 
            // tsbRemoveElement
            // 
            this.tsbRemoveElement.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbRemoveElement.Image = ((System.Drawing.Image)(resources.GetObject("tsbRemoveElement.Image")));
            this.tsbRemoveElement.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbRemoveElement.Name = "tsbRemoveElement";
            this.tsbRemoveElement.Size = new System.Drawing.Size(23, 22);
            this.tsbRemoveElement.Text = "Remove";
            this.tsbRemoveElement.ToolTipText = "Remove Element";
            // 
            // tsbElementUp
            // 
            this.tsbElementUp.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbElementUp.Image = ((System.Drawing.Image)(resources.GetObject("tsbElementUp.Image")));
            this.tsbElementUp.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbElementUp.Name = "tsbElementUp";
            this.tsbElementUp.Size = new System.Drawing.Size(23, 22);
            this.tsbElementUp.Text = "Element Up";
            // 
            // tsbElementDown
            // 
            this.tsbElementDown.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbElementDown.Image = ((System.Drawing.Image)(resources.GetObject("tsbElementDown.Image")));
            this.tsbElementDown.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbElementDown.Name = "tsbElementDown";
            this.tsbElementDown.Size = new System.Drawing.Size(23, 22);
            this.tsbElementDown.Text = "Element Down";
            // 
            // settingPanel
            // 
            this.settingPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.settingPanel.Enabled = false;
            this.settingPanel.Location = new System.Drawing.Point(200, 24);
            this.settingPanel.Name = "settingPanel";
            this.settingPanel.Size = new System.Drawing.Size(527, 364);
            this.settingPanel.TabIndex = 2;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(727, 388);
            this.Controls.Add(this.settingPanel);
            this.Controls.Add(this.elementsPanel);
            this.Controls.Add(this.menuStrip1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Blitz Reports Generator";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.elementsPanel.ResumeLayout(false);
            this.elementsPanel.PerformLayout();
            this.ts.ResumeLayout(false);
            this.ts.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem debugToolStripMenuItem;
        public System.Windows.Forms.ToolStripMenuItem newReportToolStripMenuItem;
        public System.Windows.Forms.ToolStripMenuItem openReportToolStripMenuItem;
        public System.Windows.Forms.ToolStripMenuItem saveReportSchemaToolStripMenuItem;
        public System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.Panel elementsPanel;
        private System.Windows.Forms.ToolStrip ts;
        private System.Windows.Forms.ToolStripButton tsbAddElement;
        private System.Windows.Forms.ToolStripButton tsbRemoveElement;
        private System.Windows.Forms.ToolStripButton tsbElementUp;
        private System.Windows.Forms.ToolStripButton tsbElementDown;
        private System.Windows.Forms.Panel settingPanel;
        private System.Windows.Forms.ListBox lbElements;
    }
}

