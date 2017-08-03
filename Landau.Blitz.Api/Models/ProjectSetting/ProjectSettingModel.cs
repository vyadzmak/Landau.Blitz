using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.ProjectSetting
{
    public class ProjectSettingModel
    {
        #region constructor
        /// <summary>
        /// constructor
        /// </summary>
        public ProjectSettingModel()
        {
            try
            {
                StartDates = new ProjectSettingDateModel();
                EndDates = new ProjectSettingDateModel();

            }
            catch (Exception e)
            {
                
            }
        }
        #endregion

        #region fields
        /// <summary>
        /// clients
        /// </summary>
        public List<ClientModel.ClientModel> Clients { get; set; }

        public ProjectSettingDateModel StartDates { get; set; }

        public ProjectSettingDateModel EndDates { get; set; }


        public ClientModel.ClientModel SelectedClient { get; set; }
        public string StartMonth { get; set; }
        public string EndMonth { get; set; }
        public string StartYear { get; set; }
        public string EndYear { get; set; }
       
        public double AlternateBid { get; set; }
        public double DollarRate { get; set; }

        public double PercentBid { get; set; }

        public bool ActivityService { get; set; }
        public bool ActivityTrade { get; set; }
        public bool ActivityAgriculture { get; set; }
        public bool ActivityProduction { get; set; }


        // $scope.mElement.ActivityService = false;
        // $scope.mElement.ActivityTrade = false;
        // $scope.mElement.ActivityAgriculture = false;
        // $scope.mElement.ActivityProduction = false;
        #endregion

    }
}