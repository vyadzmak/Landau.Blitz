using System;
using Landau.Blitz.Api.DBHelpers.DBTemplateHelpers;
using Landau.Blitz.Api.Models.Template;

namespace Landau.Blitz.Api.Helpers.TemplateHelpers
{
    public static class TemplateHelper
    {
        /// <summary>
        ///     get to all templates
        /// </summary>
        /// <returns></returns>
        public static string GetToAllTemplates()
        {
            try
            {
                return DBTemplateHelper.GetToAllTemplates();
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        ///     add template to db
        /// </summary>
        /// <returns></returns>
        public static string AddTemplateToDb(TemplateModel model)
        {
            try
            {
                return DBTemplateHelper.AddTemplate(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        ///     update model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string UpdateTemplate(TemplateModel model)
        {
            try
            {
                return DBTemplateHelper.UpdateTemplate(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}