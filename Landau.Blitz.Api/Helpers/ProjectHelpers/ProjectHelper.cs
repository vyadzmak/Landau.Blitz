using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DBHelpers.DBProjectHelpers;
using Landau.Blitz.Api.Models.Project;

namespace Landau.Blitz.Api.Helpers.ProjectHelpers
{
    public static class ProjectHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string GetToProjectById(int id)
        {
            try
            {
                return DBProjectHelper.GetToProjectById(id);
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string AddProjectToDb(ProjectViewModel model)
        {
            try
            {
                return DBProjectHelper.AddProjectToDb(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string UpdateProjectInDb(ProjectViewModel model)
        {
            try
            {
                return DBProjectHelper.UpdateProjectInDb(model);

            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}