using System;
using System.Collections.Generic;
using System.ComponentModel.Design.Serialization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Landau.Blitz.Api.DB;
using Landau.Blitz.Api.Helpers.SerializeHelpers;
using Landau.Blitz.Api.Models.Catalogs;

namespace Landau.Blitz.Api.DBHelpers.DBCatalogHelpers
{
    public static class DBCatalogHelper
    {
        /// <summary>
        /// get to all catalogs
        /// </summary>
        /// <returns></returns>
        public static string GetToCatalogs()
        {
            try
            {
                string result = "";
                List<CatalogModel> mCatalogs = new List<CatalogModel>();

                using (var db = new LandauBlitzEntities())
                {
                    var catalogs = db.Catalogs.Select(x => x).ToList();

                    foreach (var catalog in catalogs)
                    {
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        CatalogModel model =
                            new CatalogModel()
                            {
                                Id = catalog.Id,
                                Name = catalog.Name,
                                SystemName = catalog.SystemName,
                                Content = catalog.CatalogContent
                            };
                        List<CatalogField> fields = serializer.Deserialize<List<CatalogField>>(catalog.CatalogContent);
                        model.Fields = fields;
                        mCatalogs.Add(model);
                    }
                }

                
                result = SerializeHelper.Serialize(mCatalogs);
                return result;
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// add catalog
        /// </summary>
        /// <returns></returns>
        public static string AddCatalog(CatalogModel model)
        {
            try
            {
                model.Fields = new List<CatalogField>();
                using (var db = new LandauBlitzEntities())
                {
                    Catalogs catalog = new Catalogs()
                    {
                        CatalogContent = SerializeHelper.Serialize(model.Fields),
                        Name = model.Name,
                        SystemName = model.SystemName,
                        
                    };
                    db.Catalogs.Add(catalog);
                    db.SaveChanges();
                    model.Id = catalog.Id;
                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// update catalogs
        /// </summary>
        /// <returns></returns>
        public static string UpdateCatalog(CatalogModel model)
        {
            try
            {
                using (var db = new LandauBlitzEntities())
                {
                    Catalogs catalogs = db.Catalogs.FirstOrDefault(x => x.Id == model.Id);
                    if (catalogs != null)
                    {
                        catalogs.Name = model.Name;
                        catalogs.CatalogContent = model.Content;
                        catalogs.SystemName = model.SystemName;
                        db.SaveChanges();
                    }
                }
                return SerializeHelper.Serialize(model);
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}