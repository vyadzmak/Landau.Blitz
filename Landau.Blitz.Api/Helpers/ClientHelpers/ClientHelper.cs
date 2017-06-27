using System;
using System.Collections.Generic;
using System.Linq;
using Landau.Blitz.Api.DBHelpers.DBClientHelpers;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.ClientModel;

namespace Landau.Blitz.Api.Helpers.ClientHelpers
{
    public static class ClientHelper
    {
        /// <summary>
        ///     get to all companies
        /// </summary>
        /// <returns></returns>
        public static string GetToCompanies()
        {
            try
            {
                var clients = DBClientHelper.GetToCompanies();
                var models = new List<ClientModel>();
                foreach (var client in clients)
                {
                    var model = new ClientModel
                    {
                        Address = client.Address,
                        ClientTypeId = client.ClientTypeId,
                        ClientTypeName = client.ClientTypes.Description,
                        Id = client.Id,
                        Name = client.Name,
                        RegistrationNumber = client.RegistrationNumber,
                        RegistrationDate = client.RegistrationDate.ToString(),
                        ClientTypes = ClientTypeHelper.GetToClientType()

                    };

                    model.CurrentClientType = model.ClientTypes.FirstOrDefault(x => x.Id == model.ClientTypeId);
                    models.Add(model);
                }
                return SerializeHelper.Serialize(models);
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
        ///     get to company by ID
        /// </summary>
        /// <returns></returns>
        public static string GetToCompanyById(int id)
        {
            try
            {
                var client = DBClientHelper.GetToCompanyById(id);

                if (client != null)
                {
                    var model = new ClientModel
                    {
                        Address = client.Address,
                        ClientTypeId = client.ClientTypeId,
                        ClientTypeName = client.ClientTypes.ClientTypeName,
                        Id = client.Id,
                        Name = client.Name,
                        RegistrationNumber = client.RegistrationNumber,
                        RegistrationDate = client.RegistrationDate.ToString(),
                        ClientTypes = ClientTypeHelper.GetToClientType()
                    };
                    model.CurrentClientType = model.ClientTypes.FirstOrDefault(x => x.Id == model.ClientTypeId);

                    return SerializeHelper.Serialize(model);
                }
                return "";
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
        ///     add company
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string AddCompany(ClientModel model)
        {
            try
            {
                return SerializeHelper.Serialize(DBClientHelper.AddCompanyToDb(model));
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
        ///     add company
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string UpdateCompany(ClientModel model)
        {
            try
            {
                return SerializeHelper.Serialize(DBClientHelper.UpdateCompanyInDb(model));
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
        ///     delete client
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string DeleteCompany(int id)
        {
            try
            {
                return DBClientHelper.DeleteCompany(id);
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