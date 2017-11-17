using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.DBHelpers.DBLogHelpers;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Project;
using System.Data.Entity;
using Landau.Blitz.Api.DBHelpers.DBSettingsHelpers;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

namespace Landau.Blitz.Api.DBHelpers.DBProjectHelpers
{
    public static class DBGalleryHelper
    {
        public static List<ImageViewModel> AddImages(HttpFileCollection hfc)
        {
            try
            {
                using (LandauBlitzEntities db = new LandauBlitzEntities())
                {
                    List<ImageViewModel> response = new List<ImageViewModel>();
                    string apiUrl = DBSettingHelper.GetSettingByName("ApiUrl");
                    string imagePath = DBSettingHelper.GetSettingByName("ImagesPath");
                    string thumbsPath = DBSettingHelper.GetSettingByName("ThumbsPath");
                    int heightSetting = Convert.ToInt32(DBSettingHelper.GetSettingByName("ImageHeight"));
                    int widthSetting = Convert.ToInt32(DBSettingHelper.GetSettingByName("ImageWidth"));
                    int thumbsWidthSetting = Convert.ToInt32(DBSettingHelper.GetSettingByName("ImageThumbsWidth"));
                    int thumbsHeightSetting = Convert.ToInt32(DBSettingHelper.GetSettingByName("ImageThumbsHeight"));

                    // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
                    string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/" + imagePath);
                    string sThumbsPath = System.Web.Hosting.HostingEnvironment.MapPath("~/" + thumbsPath);

                    // CHECK THE FILE COUNT.
                    for (int iCnt = 0; iCnt < hfc.Count; iCnt++)
                    {
                        HttpPostedFile hpf = hfc[iCnt];
                        string imageName = Path.GetFileNameWithoutExtension(hpf.FileName).ToString();
                        Guid imageGuid = Guid.NewGuid();
                        int imageSize = hpf.ContentLength;
                        string imageFormat = hpf.ContentType;
                        Image image;
                        if (hpf.ContentLength > 0)
                        {
                            image = ResizeImage(hpf, widthSetting, heightSetting);
                            Image thumbsImage = image.GetThumbnailImage(thumbsWidthSetting, thumbsHeightSetting, () => false, IntPtr.Zero);

                            // SAVE THE FILES IN THE FOLDER.
                            // SAVE THE FILES IN THE FOLDER.

                            using (var b = new Bitmap(image.Width, image.Height))
                            {
                                b.SetResolution(image.HorizontalResolution, image.VerticalResolution);

                                using (var g = Graphics.FromImage(b))
                                {
                                    g.Clear(Color.White);
                                    g.DrawImageUnscaled(image, 0, 0);
                                }

                                b.Save(Path.Combine(sPath??"", imageGuid + ".png"), ImageFormat.Png);
                            }
                            using (var b = new Bitmap(thumbsImage.Width, thumbsImage.Height))
                            {
                                b.SetResolution(thumbsImage.HorizontalResolution, thumbsImage.VerticalResolution);

                                using (var g = Graphics.FromImage(b))
                                {
                                    g.Clear(Color.White);
                                    g.DrawImageUnscaled(thumbsImage, 0, 0);
                                }

                                b.Save(Path.Combine(sThumbsPath ?? "", imageGuid + ".png"), ImageFormat.Png);
                            }
                        }

                        response.Add(new ImageViewModel()
                        {
                            ImagePath = Path.Combine(apiUrl, imagePath, imageGuid + ".png"),
                            ThumbnailPath = Path.Combine(apiUrl, thumbsPath, imageGuid + ".png"),
                            OriginalFileName = Path.GetFileName(hpf.FileName),
                            FileSize = new FileInfo(Path.Combine(sPath ?? "", imageGuid + ".png")).Length,
                            ImageGuid = imageGuid.ToString()
                        });
                    }

                    return response;
                }
            }
            catch (Exception exception)
            {
                //string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                //ExceptionHelper.GetException(methodName, exception);
                return null;
            }
        }

        private static Image ResizeImage(HttpPostedFile hpf, int width, int height)
        {
            try
            {
                Image image = Image.FromStream(hpf.InputStream, true, true);

                double ratioX = (double)width / image.Width;
                double ratioY = (double)height / image.Height;
                double ratio = Math.Min(ratioX, ratioY);

                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);

                var newImage = new Bitmap(newWidth, newHeight);

                using (var graphics = Graphics.FromImage(newImage))
                    graphics.DrawImage(image, 0, 0, newWidth, newHeight);

                return newImage;
            }
            catch (Exception exception)
            {
                //string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                //ExceptionHelper.GetException(methodName, exception);
                return null;
            }
        }
    }
}