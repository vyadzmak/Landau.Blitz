using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class ResumeStaticInfo
    {
        private static List<Models.ResumeField> _resumeFields;
        public static List<Models.ResumeField> ResumeFields
        {
            get
            {
                if (_resumeFields != null)
                {
                    return _resumeFields;
                }
                else
                {
                    return new List<Models.ResumeField>();
                }
            }
            set { _resumeFields = value; }

        }
    }
}
