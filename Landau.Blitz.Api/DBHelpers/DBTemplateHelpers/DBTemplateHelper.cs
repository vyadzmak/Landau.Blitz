using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Template;
using System.Data.Entity;
using Landau.Blitz.QuickNode;

namespace Landau.Blitz.Api.DBHelpers.DBTemplateHelpers
{
    public static class DBTemplateHelper
    {
        #region get
        /// <summary>
        /// get to all templates
        /// </summary>
        /// <returns></returns>
        public static string GetToAllTemplates()
        {
            try
            {
                List<TemplateModel> models = new List<TemplateModel>();
                using (var db = new LandauBlitzEntities())
                {
                    var templates = db.Templates
                        .Include(x => x.Users)
                        .Include(x => x.Clients)
                        .Select(x => x)
                        .ToList();

                    foreach (var template in templates)
                    {
                        TemplateModel model = new TemplateModel()
                        {
                            UserCreatorId = template.UserCreatorId,
                            Id = template.Id,
                            ClientId = template.ClientId,
                            Content =  template.Template,
                            CreationDate = template.CreationDate.ToString(),
                            LastUpdateDate = template.LastUpdateDate.ToString(),
                            Description = template.Description,
                            Name = template.Name,
                            UserCreatorName = template.Users.FirstName+" "+template.Users.LastName
                        };
                        models.Add(model);
                    }
                }


                return SerializeHelper.Serialize(models);
            }
            catch (Exception e)
            {
                return "";
            }
        }
        #endregion

        #region add template

        /// <summary>
        /// add template model
        /// </summary>
        /// <returns></returns>
        public static string AddTemplate(TemplateModel model)
        {
            try
            {
                using (var db= new LandauBlitzEntities())
                {
                    Templates template = new Templates()
                    {
                        CreationDate = DateTime.Now,
                        LastUpdateDate = DateTime.Now,
                        Description = model.Description,
                        Name = model.Name,
                        UserCreatorId = model.UserCreatorId
                    };
                    db.Templates.Add(template);
                    db.SaveChanges();

                    QuickNode.Processor processor = new Processor();
                    string content = processor.GetToNewContent(template.Name, template.Id);
                    
                    Templates tem = db.Templates
                        .Include(x=>x.Users)
                        .FirstOrDefault(x => x.Id == template.Id);

                    if (tem != null)
                    {
                        tem.Template = content;
                        db.SaveChanges();
                    }
                    model.Id = template.Id;
                    model.CreationDate = template.CreationDate.ToString();
                    model.LastUpdateDate = template.LastUpdateDate.ToString();
                    model.UserCreatorName = tem.Users.FirstName + " " + tem.Users.LastName;
                    model.Content = content;
                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                return "";
            }

        }
        #endregion

        public static string UpdateTemplate(TemplateModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    int templateId = model.Id;

                    Templates template = db.Templates.FirstOrDefault(x => x.Id == templateId);

                    if (template != null)
                    {
                        template.Description = model.Description;
                        template.LastUpdateDate = DateTime.Now;
                        template.Name = model.Name;
                        if (!string.IsNullOrEmpty(model.Content))
                        template.Template = model.Content;
                        db.SaveChanges();
                    }

                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}