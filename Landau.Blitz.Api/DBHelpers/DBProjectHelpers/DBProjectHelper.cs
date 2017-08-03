using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Project;
using System.Data.Entity;

namespace Landau.Blitz.Api.DBHelpers.DBProjectHelpers
{
    public static class DBProjectHelper
    {
        #region helpers
        /// <summary>
        /// get to projects id
        /// </summary>
        /// <returns></returns>
        public static List<Projects> GetProjectsByUserId(int userId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.Projects
                        .Include(x=>x.Users)
                        
                        .Where(x => x.CreatorId == userId)
                        .ToList();
                }
                
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #endregion


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string GetToProjectById(int id)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return SerializeHelper.Serialize(db.Projects.FirstOrDefault(x => x.Id==id));
                }
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
        /// Получить проект по айдишнику
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static DB.Projects GetProjectEntityById(int id)
        {
            using (var db = new LandauBlitzEntities())
            {
                DB.Projects pj = db.Projects.FirstOrDefault(x => x.Id == id);
                return pj;
            }
        }

        /// <summary>
        /// update project
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string UpdateProjectInDb(ProjectViewModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Projects project = db.Projects.FirstOrDefault(x => x.Id == model.Id);
                    if (project != null)
                    {
                        project.ProjectContent = model.Content;
                        db.SaveChanges();
                     
                    }
                }
                return SerializeHelper.Serialize(model);
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

        public static string AddProjectToDb(ProjectViewModel model)
        {

            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Projects project = new Projects();
                    project.CreationDate = DateTime.Now;
                    project.CreatorId = model.CreatorId;
                    project.Name = model.Name;
                    project.ProjectContent = model.Content;
                    project.ProjectStateId = 1;
                    project.ClientId = model.ProjectSetting.SelectedClient.Id;
                    db.Projects.Add(project);
                    db.SaveChanges();
                    Users user = db.Users.FirstOrDefault(x => x.Id == model.CreatorId);
                    if (user != null)
                    {
                        model.CreatorName = user.FirstName + " " + user.LastName;
                    }
                    model.Id = project.Id;
                    model.CreationDate = project.CreationDate.ToString();
                }
                    return SerializeHelper.Serialize(model);
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
        /// <param name="clientId"></param>
        /// <returns></returns>
        public static string GetToParentProjectById(int clientId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Projects lastProject = db.Projects.ToList().LastOrDefault(x => x.ClientId == clientId);
                    return SerializeHelper.Serialize(lastProject);
                }
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
    }
}