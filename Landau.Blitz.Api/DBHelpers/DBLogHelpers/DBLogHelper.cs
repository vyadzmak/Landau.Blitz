using System;
using System.Collections.Generic;
using System.Linq;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Log;

namespace Landau.Blitz.Api.DBHelpers.DBLogHelpers
{
    /// <summary>
    /// log helper
    /// </summary>
    public static class DBLogHelper
    {
        /// <summary>
        /// add record to log
        /// </summary>
        public static void AddLog(string message)
        {
            try
            {

                using (var db = new LandauBlitzEntities())
                {
                    if (db.Log.Count() > 1000)
                    {
                        db.Log.RemoveRange(db.Log.Select(x => x));
                    }

                    db.Log.Add(new Log() { CreationDate = DateTime.Now, Message = message });
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
            }
        }

        /// <summary>
        /// get to all log records
        /// </summary>
        /// <returns></returns>

        public static string GetToLog()
        {
            try
            {
                using (var db =new LandauBlitzEntities())
                {
                    List<Log> logs = db.Log.Select(x => x).ToList();
                    List<LogModel> models = new List<LogModel>();
                    logs = logs.OrderByDescending(x => x.CreationDate).ToList();
                    foreach (var log in logs)
                    {
                        models.Add(new LogModel() {Id=log.Id, Date = log.CreationDate.ToString(), Message = log.Message});
                    }
                    return SerializeHelper.Serialize(models);

                }
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// clean log
        /// </summary>
        /// <returns></returns>
        public static string CleanLog()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    List<Log> logs = db.Log.Select(x => x).ToList();
                    db.Log.RemoveRange(logs);
                    db.SaveChanges();
                }

                return "OK";
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}