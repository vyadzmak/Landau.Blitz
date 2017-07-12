using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Models
{
    /// <summary>
    /// Модель главы/подглавы/раздела заключения (резюме)
    /// </summary>
    public class ResumeField
    {
        /// <summary>
        /// Идентификатор поля
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Наименование из JSON-модели
        /// </summary>
        public string RawName { get; set; }
        /// <summary>
        /// Наименование поля как на представлении
        /// </summary>
        public  string TranslatedName { get; set; }
        /// <summary>
        /// Конструктор
        /// </summary>
        public ResumeField(int id, string rawName, string translatedName)
        {
            Id = id;
            RawName = rawName;
            TranslatedName = translatedName;
        }
    }
}
