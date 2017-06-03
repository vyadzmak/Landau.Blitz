using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Landau.Blitz.Api.Models.Error
{
    public class ErrorModel
    {
        #region constructors
        /// <summary>
        /// constructor
        /// </summary>
        public ErrorModel()
        {
            try
            {

            }
            catch(Exception e)
            {
                
            }
        }
        /// <summary>
        /// constructor
        /// </summary>
        public ErrorModel(string exception, string innerException,string methodName="")
        {
            try
            {
                this.MethodName = methodName;
                this.Exception = exception;
                this.InnerException = innerException;
            }
            catch (Exception e)
            {
            }
        }
        #endregion 

        #region fields

        /// <summary>
        /// method name
        /// </summary>
        public string MethodName { get; set; }
        /// <summary>
        /// exception
        /// </summary>
        public string Exception { get; set; }

        /// <summary>
        /// inner exception
        /// </summary>
        public string InnerException { get; set; }
        #endregion
    }
}