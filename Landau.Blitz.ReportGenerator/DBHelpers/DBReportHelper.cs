using System;
using System.Collections.Generic;
using System.Linq;
using Landau.Blitz.Exporter.Helpers;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.ReportGenerator.DB;

namespace Landau.Blitz.ReportGenerator.DBHelpers
{
    public static class DBReportHelper
    {
        /// <summary>
        ///     get to all report tepmlates
        /// </summary>
        /// <returns></returns>
        public static List<ReportTemplates> GetToAllReportTemplates()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.ReportTemplates.Select(x => x).ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        ///     get to single template
        /// </summary>
        /// <returns></returns>
        public static ReportTemplates GetToTemplate(int templateId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.ReportTemplates.FirstOrDefault(x => x.Id == templateId);
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        ///     add template to db
        /// </summary>
        /// <returns></returns>
        public static ReportSchemaModel AddTemplate(ReportSchemaModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    var template = new ReportTemplates
                    {
                        CreationDate = DateTime.Now,
                        Name = model.Name,
                        UpdateDate = DateTime.Now,
                        Template = SerializeHelper.Serialize(model)
                    };

                    db.ReportTemplates.Add(template);
                    db.SaveChanges();
                    model.Id = template.Id;

                    template.Template = SerializeHelper.Serialize(model);
                    db.SaveChanges();

                    Program.MainForm.CurrentReport = model;
                    Program.MainForm.RefreshList();
                }
                return model;
            }
            catch (Exception e)
            {
                return model;
            }
        }


        /// <summary>
        ///     update template to db
        /// </summary>
        /// <returns></returns>
        public static ReportSchemaModel UpdateTemplate(ReportSchemaModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    var template = db.ReportTemplates.FirstOrDefault(x => x.Id == model.Id);

                    if (template != null)
                    {
                        template.Name = model.Name;
                        template.UpdateDate = DateTime.Now;
                        template.Template = SerializeHelper.Serialize(model);
                        db.SaveChanges();
                        return model;
                    }
                }
                return model;
            }
            catch (Exception e)
            {
                return model;
            }
        }

        /// <summary>
        /// delete report from db
        /// </summary>
        public static bool DeleteReport(int reportId)
        {
            try
            {
                using (var db =new LandauBlitzEntities())
                {
                    ReportTemplates template = db.ReportTemplates.FirstOrDefault(x => x.Id == reportId);
                    if (template != null)
                    {
                        db.ReportTemplates.Remove(template);
                        db.SaveChanges();
                        return true;
                    }
                    
                }
                return false;
            }
            catch (Exception e)
            {
                return true;
            }
        }
    }
}