using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Project
{
    public class CliendDataViewModel
    {
        /// <summary>
        /// Дата регистрации
        /// </summary>
        public string RegistrationDate { get; set; }
        /// <summary>
        /// ???
        /// </summary>
        public string ReRegistrationDate { get; set; }
        /// <summary>
        /// Наименование организации
        /// </summary>
        public string OrganizationName { get; set; }
        /// <summary>
        /// Правовая форма организации
        /// </summary>
        public string OrganizationType { get; set; }
        /// <summary>
        /// Количество направлений деятельности
        /// </summary>
        public string NumberOfActivities { get; set; }
        /// <summary>
        /// Сектора экономики
        /// </summary>
        public List<string> EconomicSectors { get; set; }
        /// <summary>
        /// Фактический опыт работы
        /// </summary>
        public string ActualExperience { get; set; }
        /// <summary>
        /// Официально трудоустроенных работников
        /// </summary>
        public string OfficiallyEmployees { get; set; }
        public string ActuallyEmployees { get; set; }
        public List<object> BusinessPlaces { get; set; }
        //public List<DirectorInfo> DirectorInfos { get; set; }
        public List<object> CreditHistoryInfos { get; set; }

    }
}