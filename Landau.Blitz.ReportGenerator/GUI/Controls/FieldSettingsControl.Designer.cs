namespace Landau.Blitz.ReportGenerator.GUI.Controls
{
    partial class FieldSettingsControl
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.stylePanel = new System.Windows.Forms.Panel();
            this.mainSetting = new System.Windows.Forms.Panel();
            this.lblName = new System.Windows.Forms.Label();
            this.txtElementName = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.colorPicker = new System.Windows.Forms.ColorDialog();
            this.btnForegroundColor = new System.Windows.Forms.Button();
            this.lblForegroundColor = new System.Windows.Forms.Label();
            this.lblBackgroundColor = new System.Windows.Forms.Label();
            this.btnBackgroundColor = new System.Windows.Forms.Button();
            this.lblBackgroundColorc = new System.Windows.Forms.Label();
            this.lblFontSize = new System.Windows.Forms.Label();
            this.cbFontSize = new System.Windows.Forms.ComboBox();
            this.cbTextAlign = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.cbFontStyle = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.cbFontFamily = new System.Windows.Forms.ComboBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.rtbContent = new System.Windows.Forms.RichTextBox();
            this.stylePanel.SuspendLayout();
            this.mainSetting.SuspendLayout();
            this.SuspendLayout();
            // 
            // stylePanel
            // 
            this.stylePanel.Controls.Add(this.cbFontFamily);
            this.stylePanel.Controls.Add(this.label5);
            this.stylePanel.Controls.Add(this.cbFontStyle);
            this.stylePanel.Controls.Add(this.label4);
            this.stylePanel.Controls.Add(this.cbTextAlign);
            this.stylePanel.Controls.Add(this.label3);
            this.stylePanel.Controls.Add(this.cbFontSize);
            this.stylePanel.Controls.Add(this.lblFontSize);
            this.stylePanel.Controls.Add(this.lblBackgroundColor);
            this.stylePanel.Controls.Add(this.btnBackgroundColor);
            this.stylePanel.Controls.Add(this.lblBackgroundColorc);
            this.stylePanel.Controls.Add(this.lblForegroundColor);
            this.stylePanel.Controls.Add(this.btnForegroundColor);
            this.stylePanel.Controls.Add(this.label1);
            this.stylePanel.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.stylePanel.Location = new System.Drawing.Point(0, 185);
            this.stylePanel.Name = "stylePanel";
            this.stylePanel.Size = new System.Drawing.Size(462, 179);
            this.stylePanel.TabIndex = 0;
            // 
            // mainSetting
            // 
            this.mainSetting.Controls.Add(this.rtbContent);
            this.mainSetting.Controls.Add(this.label2);
            this.mainSetting.Controls.Add(this.txtElementName);
            this.mainSetting.Controls.Add(this.lblName);
            this.mainSetting.Dock = System.Windows.Forms.DockStyle.Fill;
            this.mainSetting.Location = new System.Drawing.Point(0, 0);
            this.mainSetting.Name = "mainSetting";
            this.mainSetting.Size = new System.Drawing.Size(462, 185);
            this.mainSetting.TabIndex = 1;
            // 
            // lblName
            // 
            this.lblName.AutoSize = true;
            this.lblName.Location = new System.Drawing.Point(3, 9);
            this.lblName.Name = "lblName";
            this.lblName.Size = new System.Drawing.Size(76, 13);
            this.lblName.TabIndex = 0;
            this.lblName.Text = "Element Name";
            // 
            // txtElementName
            // 
            this.txtElementName.Location = new System.Drawing.Point(85, 6);
            this.txtElementName.Name = "txtElementName";
            this.txtElementName.ReadOnly = true;
            this.txtElementName.Size = new System.Drawing.Size(361, 20);
            this.txtElementName.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(3, 14);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(88, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Foreground Color";
            // 
            // btnForegroundColor
            // 
            this.btnForegroundColor.Location = new System.Drawing.Point(152, 9);
            this.btnForegroundColor.Name = "btnForegroundColor";
            this.btnForegroundColor.Size = new System.Drawing.Size(31, 23);
            this.btnForegroundColor.TabIndex = 2;
            this.btnForegroundColor.Text = "...";
            this.btnForegroundColor.UseVisualStyleBackColor = true;
            this.btnForegroundColor.Click += new System.EventHandler(this.btnForegroundColor_Click);
            // 
            // lblForegroundColor
            // 
            this.lblForegroundColor.AutoSize = true;
            this.lblForegroundColor.Location = new System.Drawing.Point(97, 14);
            this.lblForegroundColor.Name = "lblForegroundColor";
            this.lblForegroundColor.Size = new System.Drawing.Size(49, 13);
            this.lblForegroundColor.TabIndex = 3;
            this.lblForegroundColor.Text = "######";
            // 
            // lblBackgroundColor
            // 
            this.lblBackgroundColor.AutoSize = true;
            this.lblBackgroundColor.Location = new System.Drawing.Point(97, 41);
            this.lblBackgroundColor.Name = "lblBackgroundColor";
            this.lblBackgroundColor.Size = new System.Drawing.Size(49, 13);
            this.lblBackgroundColor.TabIndex = 6;
            this.lblBackgroundColor.Text = "######";
            // 
            // btnBackgroundColor
            // 
            this.btnBackgroundColor.Location = new System.Drawing.Point(152, 36);
            this.btnBackgroundColor.Name = "btnBackgroundColor";
            this.btnBackgroundColor.Size = new System.Drawing.Size(31, 23);
            this.btnBackgroundColor.TabIndex = 5;
            this.btnBackgroundColor.Text = "...";
            this.btnBackgroundColor.UseVisualStyleBackColor = true;
            this.btnBackgroundColor.Click += new System.EventHandler(this.btnBackgroundColor_Click);
            // 
            // lblBackgroundColorc
            // 
            this.lblBackgroundColorc.AutoSize = true;
            this.lblBackgroundColorc.Location = new System.Drawing.Point(3, 41);
            this.lblBackgroundColorc.Name = "lblBackgroundColorc";
            this.lblBackgroundColorc.Size = new System.Drawing.Size(92, 13);
            this.lblBackgroundColorc.TabIndex = 4;
            this.lblBackgroundColorc.Text = "Background Color";
            // 
            // lblFontSize
            // 
            this.lblFontSize.AutoSize = true;
            this.lblFontSize.Location = new System.Drawing.Point(3, 67);
            this.lblFontSize.Name = "lblFontSize";
            this.lblFontSize.Size = new System.Drawing.Size(51, 13);
            this.lblFontSize.TabIndex = 7;
            this.lblFontSize.Text = "Font Size";
            // 
            // cbFontSize
            // 
            this.cbFontSize.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbFontSize.FormattingEnabled = true;
            this.cbFontSize.Location = new System.Drawing.Point(62, 67);
            this.cbFontSize.Name = "cbFontSize";
            this.cbFontSize.Size = new System.Drawing.Size(121, 21);
            this.cbFontSize.TabIndex = 8;
            this.cbFontSize.SelectedIndexChanged += new System.EventHandler(this.cbFontSize_SelectedIndexChanged);
            // 
            // cbTextAlign
            // 
            this.cbTextAlign.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbTextAlign.FormattingEnabled = true;
            this.cbTextAlign.Location = new System.Drawing.Point(62, 94);
            this.cbTextAlign.Name = "cbTextAlign";
            this.cbTextAlign.Size = new System.Drawing.Size(121, 21);
            this.cbTextAlign.TabIndex = 10;
            this.cbTextAlign.SelectedIndexChanged += new System.EventHandler(this.cbTextAlign_SelectedIndexChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(3, 94);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(54, 13);
            this.label3.TabIndex = 9;
            this.label3.Text = "Text Align";
            // 
            // cbFontStyle
            // 
            this.cbFontStyle.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbFontStyle.FormattingEnabled = true;
            this.cbFontStyle.Location = new System.Drawing.Point(62, 121);
            this.cbFontStyle.Name = "cbFontStyle";
            this.cbFontStyle.Size = new System.Drawing.Size(121, 21);
            this.cbFontStyle.TabIndex = 12;
            this.cbFontStyle.SelectedIndexChanged += new System.EventHandler(this.cbFontStyle_SelectedIndexChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(3, 121);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(54, 13);
            this.label4.TabIndex = 11;
            this.label4.Text = "Font Style";
            // 
            // cbFontFamily
            // 
            this.cbFontFamily.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbFontFamily.FormattingEnabled = true;
            this.cbFontFamily.Location = new System.Drawing.Point(62, 148);
            this.cbFontFamily.Name = "cbFontFamily";
            this.cbFontFamily.Size = new System.Drawing.Size(121, 21);
            this.cbFontFamily.TabIndex = 14;
            this.cbFontFamily.SelectedIndexChanged += new System.EventHandler(this.cbFontFamily_SelectedIndexChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(3, 148);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(60, 13);
            this.label5.TabIndex = 13;
            this.label5.Text = "Font Family";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(3, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(85, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Element Content";
            // 
            // rtbContent
            // 
            this.rtbContent.Location = new System.Drawing.Point(85, 32);
            this.rtbContent.Name = "rtbContent";
            this.rtbContent.Size = new System.Drawing.Size(361, 119);
            this.rtbContent.TabIndex = 3;
            this.rtbContent.Text = "";
            this.rtbContent.TextChanged += new System.EventHandler(this.rtbContent_TextChanged);
            // 
            // FieldSettingsControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.mainSetting);
            this.Controls.Add(this.stylePanel);
            this.Name = "FieldSettingsControl";
            this.Size = new System.Drawing.Size(462, 364);
            this.stylePanel.ResumeLayout(false);
            this.stylePanel.PerformLayout();
            this.mainSetting.ResumeLayout(false);
            this.mainSetting.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel stylePanel;
        private System.Windows.Forms.Button btnForegroundColor;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel mainSetting;
        private System.Windows.Forms.TextBox txtElementName;
        private System.Windows.Forms.Label lblName;
        private System.Windows.Forms.ColorDialog colorPicker;
        private System.Windows.Forms.Label lblForegroundColor;
        private System.Windows.Forms.Label lblBackgroundColor;
        private System.Windows.Forms.Button btnBackgroundColor;
        private System.Windows.Forms.Label lblBackgroundColorc;
        private System.Windows.Forms.ComboBox cbFontSize;
        private System.Windows.Forms.Label lblFontSize;
        private System.Windows.Forms.ComboBox cbFontStyle;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ComboBox cbTextAlign;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox cbFontFamily;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.RichTextBox rtbContent;
        private System.Windows.Forms.Label label2;
    }
}
