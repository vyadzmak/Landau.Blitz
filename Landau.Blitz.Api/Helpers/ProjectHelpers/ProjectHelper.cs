using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.DBHelpers.DBProjectHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
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
        public static string GetToParentProjectById(int id)
        {
            try
            {
                return DBProjectHelper.GetToParentProjectById(id);
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return "";
            }
        }
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
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
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
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
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
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return "";
            }
        }

        /// <summary>
        /// get to project by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static string GetToProjectByUserId(int userId)
        {
            try
            {
                List<Projects> projects = DBProjectHelper.GetProjectsByUserId(userId);

                List<ProjectViewModel> models = new List<ProjectViewModel>();


                foreach (var project in projects)
                {
                    models.Add(new ProjectViewModel()
                    {
                        Content = project.ProjectContent,
                        CreationDate = project.CreationDate.ToString(),
                        CreatorId = project.CreatorId,
                        CreatorName = project.Users.FirstName+" "+project.Users.LastName,
                        Id = project.Id,
                        Name = project.Name
                    });
                }

                return SerializeHelper.Serialize(models);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}