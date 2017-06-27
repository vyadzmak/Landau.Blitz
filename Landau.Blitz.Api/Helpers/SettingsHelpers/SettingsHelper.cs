using System;
using System.Reflection;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.DBHelpers.DBSettingsHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Settings;

namespace Landau.Blitz.Api.Helpers.SettingsHelpers
{
    /// <summary>
    ///     settings helper
    /// </summary>
    public class SettingsHelper
    {
        /// <summary>
        ///     get to all settings
        /// </summary>
        /// <returns></returns>
        public static string GetToSettings()
        {
            try
            {
                return SerializeHelper.Serialize(DBSettingHelper.GetToSettings());
            }
            catch (Exception e)
            {
                var innerException = e.InnerException == null ? "" : e.InnerException.Message;
                var methodName = MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message +
                                   " Innner Exception: " +
                                   innerException);
                return "";
            }
        }

        /// <summary>
        ///     get to setting by Id
        /// </summary>
        /// <returns></returns>
        public static string GetToSettingById(int settingId)
        {
            try
            {
                return SerializeHelper.Serialize(DBSettingHelper.GetToSettingById(settingId));
            }
            catch (Exception e)
            {
                var innerException = e.InnerException == null ? "" : e.InnerException.Message;
                var methodName = MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message +
                                   " Innner Exception: " +
                                   innerException);
                return "";
            }
        }

        /// <summary>
        ///     add setting
        /// </summary>
        /// <returns></returns>
        public static string AddSetting(SettingModel model)
        {
            try
            {
                return DBSettingHelper.AddSettingInDb(model);
            }
            catch (Exception e)
            {
                var innerException = e.InnerException == null ? "" : e.InnerException.Message;
                var methodName = MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message +
                                   " Innner Exception: " +
                                   innerException);
                return "";
            }
        }

        /// <summary>
        ///     update setting
        /// </summary>
        /// <returns></returns>
        public static string UpdateSetting(SettingModel model)
        {
            try
            {
                return DBSettingHelper.UpdateSettingInDb(model);
            }
            catch (Exception e)
            {
                var innerException = e.InnerException == null ? "" : e.InnerException.Message;
                var methodName = MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message +
                                   " Innner Exception: " +
                                   innerException);
                return "";
            }
        }
    }
}