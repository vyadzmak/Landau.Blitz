using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBProjectHelpers;
using Landau.Blitz.Api.DBHelpers.DBProjectSettingsHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.ClientModel;
using Landau.Blitz.Api.Models.ProjectSetting;

namespace Landau.Blitz.Api.Helpers.ProjectSettingsHelpers
{
    public static class ProjectSettingHelper
    {
        /// <summary>
        /// get to project setting
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static  string GetToProjectSettings(int userId)
        {
            try
            {
                List<Clients> clients = DBProjectSettingsHelper.GetToClientsByUserId(userId);

                ProjectSettingModel model = new ProjectSettingModel();

                model.Clients = new List<ClientModel>();


                foreach (var client in clients)
                {
                    model.Clients.Add(new ClientModel() {Id = client.Id, Name = client.Name});
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