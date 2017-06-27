using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Landau.Blitz.Api.DBHelpers.DBSettingsHelpers;
using Landau.Blitz.Api.Helpers.SettingsHelpers;
using Landau.Blitz.Api.Models.Settings;

namespace Landau.Blitz.Api.Controllers
{
    public class SettingsController : ApiController
    {
        // GET: api/Settings
        public string Get()
        {
            return SettingsHelper.GetToSettings();
        }

        // GET: api/Settings/5
        public string Get(int id)
        {
            return SettingsHelper.GetToSettingById(id);
        }

        // POST: api/Settings
        public string Post([FromBody]SettingModel model)
        {
            return SettingsHelper.AddSetting(model);
        }

        // PUT: api/Settings/5
        public string Put([FromBody]SettingModel model)
        {
            return SettingsHelper.UpdateSetting(model);
        }

        // DELETE: api/Settings/5
        public string Delete(int id)
        {
            return DBSettingHelper.DeleteSettingInDb(id);
        }
    }
}
