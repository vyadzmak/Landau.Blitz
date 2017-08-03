using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;

namespace Landau.Blitz.Api.DBHelpers.DBReportHelpers
{
    public static class DBReportHelper
    {
        public static ReportTemplates GetToReport(int id)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    return db.ReportTemplates.FirstOrDefault(x => x.Id == id);
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}