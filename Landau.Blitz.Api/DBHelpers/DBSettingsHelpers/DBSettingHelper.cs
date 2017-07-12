using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Settings;

namespace Landau.Blitz.Api.DBHelpers.DBSettingsHelpers
{
    /// <summary>
    /// setting helper
    /// </summary>
    public class DBSettingHelper
    {
        /// <summary>
        /// get to all settings
        /// </summary>
        /// <returns></returns>
        public static List<Settings> GetToSettings()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.Settings.Select(x=>x).ToList();
                }

            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return null;
            }
        }


        /// <summary>
        /// get settingById
        /// </summary>
        /// <returns></returns>
        public static Settings GetToSettingById(int settingId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.Settings.FirstOrDefault(x=>x.Id==settingId);
                }

            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return null;
            }
        }


        /// <summary>
        /// add setting
        /// </summary>
        /// <returns></returns>
        public static string AddSettingInDb(SettingModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Settings setting = new Settings()
                    {
                        SettingName = model.SettingName,
                        SettingValue = model.SettingValue
                    };
                    db.Settings.Add(setting);
                    db.SaveChanges();
                    model.Id = setting.Id;
                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return null;
            }
        }

        /// <summary>
        /// add setting
        /// </summary>
        /// <returns></returns>
        public static string UpdateSettingInDb(SettingModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Settings setting = db.Settings.FirstOrDefault(x=>x.Id==model.Id);
                    if (setting!=null)
                    {
                        setting.SettingName = model.SettingName;
                        setting.SettingValue = model.SettingValue;
                    };
                    db.SaveChanges();
                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return null;
            }
        }

        /// <summary>
        /// add setting
        /// </summary>
        /// <returns></returns>
        public static string DeleteSettingInDb(int id)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Settings setting = db.Settings.FirstOrDefault(x => x.Id == id);
                    if (setting != null)
                    {
                        db.Settings.Remove(setting);
                        db.SaveChanges();

                    };
                }
                return "OK";
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);
                return "Error";
            }
        }

        public static string GetSettingByName(string name)
        {
            try
            {
                using (LandauBlitzEntities db = new LandauBlitzEntities())
                {
                    return db.Settings.FirstOrDefault(x => x.SettingName == name).SettingValue;
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