using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.ProjectSetting
{
    public class ProjectSettingDateModel
    {

        public ProjectSettingDateModel()
        {
            try
            {
                Months = new List<string>()
                {
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                };

                Years = new List<string>()
                {
                    "2017",
                    "2016",
                    "2015",
                    "2014",
                    "2013"
                };
            }
            catch (Exception e)
            {
                
            }
        }

        public List<string> Months { get; set; }
        public List<string> Years { get; set; }
    }
}