using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.ClientModel;

namespace Landau.Blitz.Api.DBHelpers.DBClientHelpers
{
    public class DBClientHelper
    {

        #region get 
        /// <summary>
        /// get to all clients
        /// </summary>
        /// <returns></returns>
        public static List<Clients> GetToCompanies()
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    var result = db.Clients.Select(x => x)
                        .Include(x => x.ClientTypes)
                        .Where(x=>x.ClientTypeId!=1)
                        .ToList();
                    return result;



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
        /// get to all clients
        /// </summary>
        /// <returns></returns>
        public static List<Clients> GetToCompaniesByUserId(int userId)
        {
            try
            {
                

                using (var db = new LandauBlitzEntities())
                {

                    var data = db.UserLogins
                        .Include(x => x.Users)
                        .Include(x=>x.Users.Clients)
                        
                        .FirstOrDefault(x=>x.Id==userId);
                    if (data == null) return null;
                    int clientId = (int)data.Users.ClientId;

                    switch (data.UserRoleId)
                    {
                        case 1:
                            var result = db.Clients.Select(x => x)
                                .Include(x => x.ClientTypes)
                                .ToList();
                            return result;
                            break;
                            
                        case 2:
                             result = db.Clients.Select(x => x)
                                .Include(x => x.ClientTypes)
                                .Where(x => x.ClientCreatorId == clientId || x.Id == clientId)
                                .ToList();
                            return result;

                        case 3:
                            result = db.Clients.Select(x => x)
                                .Include(x => x.ClientTypes)
                                .Where(x => x.ClientCreatorId == clientId)
                                .ToList();
                            return result;
                            break;  
                    }
                }

                return null;
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
        /// get to all clients
        /// </summary>
        /// <returns></returns>
        public static Clients GetToCompanyById(int id)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Clients result = db.Clients.Where(x => x.Id==id)
                        .Include(x => x.ClientTypes)
                        .FirstOrDefault()
                        ;

                    return result;
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

        #endregion

        /// <summary>
        /// add company
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static ClientModel AddCompanyToDb(ClientModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Clients client = new Clients()
                    {
                        Address = model.Address,
                        Name = model.Name,
                        ClientTypeId = model.CurrentClientType.Id,
                        RegistrationDate = DateTime.Now,
                        RegistrationNumber = model.RegistrationNumber,
                        ClientCreatorId = model.ClientCreatorId
                    };
                    model.RegistrationDate = client.RegistrationDate.ToString();
                    db.Clients.Add(client);
                    db.SaveChanges();
                    model.Id = client.Id;
                }
                return model;
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return model;
            }
        }
        /// <summary>
        /// update company
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static ClientModel UpdateCompanyInDb(ClientModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Clients client = db.Clients.FirstOrDefault(x => x.Id == model.Id);
                    if (client!=null)
                    {
                        client.Address = model.Address;
                        client.Name = model.Name;
                        client.ClientTypeId = model.CurrentClientType.Id;
                       
                        client.RegistrationNumber = model.RegistrationNumber;
                        //db.Clients.Add(client);
                        db.SaveChanges();
                        model.Id = client.Id;
                       // model.ClientTypes = client
                    };
                                    }
                return model;
            }
            catch (Exception e)
            {
                string innerException = e.InnerException == null ? "" : e.InnerException.Message;
                string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                DBLogHelper.AddLog("Error in method: " + methodName + "; Exception: " + e.Message + " Innner Exception: " +
                                   innerException);

                return model;
            }
        }

        /// <summary>
        /// delete client
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string DeleteCompany(int id)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Clients client = db.Clients.FirstOrDefault(x => x.Id == id);

                    List<Projects> projects = db.Projects.Where(x => x.ClientId == client.Id).ToList();
                    if (projects != null)
                    {
                        db.Projects.RemoveRange(projects);
                        db.SaveChanges();
                    }

                    if (client != null)
                    {
                        List<Users> users = db.Users.Where(x => x.ClientId == id).ToList();

                        foreach (var user in users)
                        {
                            List<UserLogins> logins = db.UserLogins.Where(x => x.UserId == user.Id).ToList();

                            if (logins != null)
                            {
                                db.UserLogins.RemoveRange(logins);
                                db.SaveChanges();
                            }

                            
                        }

                        if (users != null)
                        {
                            db.Users.RemoveRange(users);
                            db.SaveChanges();
                        }

                        db.Clients.Remove(client);
                    }
                    db.SaveChanges();
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
    }
}