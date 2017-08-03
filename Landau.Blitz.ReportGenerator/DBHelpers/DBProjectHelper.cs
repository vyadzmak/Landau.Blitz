using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Landau.Blitz.ReportGenerator.DB;

namespace Landau.Blitz.ReportGenerator.DBHelpers
{
    public static class DBProjectHelper
    {
        public static string GetProjectById(int projectId)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.Projects.FirstOrDefault(x => x.Id == projectId).ProjectContent;

                }
            }
            catch (Exception e)
            {
                return "";
            }
        } 
    }
}
