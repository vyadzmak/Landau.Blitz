using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.Models.ProjectSetting;

namespace Landau.Blitz.Api.Models.Project
{
    public class ImageViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ImageViewModel()
        {
            try
            {

            }
            catch (Exception e)
            {
                
            }
        }
        #region fields
        /// <summary>
        /// Id картинки
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// путь к изображению
        /// </summary>
        public string ImagePath { get; set; }

        /// <summary>
        /// путь к thumb изображению
        /// </summary>
        public string ThumbnailPath { get; set; }

        /// <summary>
        /// имя изображения
        /// </summary>
        public string OriginalFileName { get; set; }

        /// <summary>
        /// размер файла
        /// </summary>
        public float FileSize { get; set; }

        /// <summary>
        /// GUID изображения
        /// </summary>
        public string ImageGuid { get; set; }
        #endregion
    }
}