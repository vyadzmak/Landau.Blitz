using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Landau.Blitz.QuickNode.Models;
using Landau.Blitz.QuickNode.Models.GeneralModels;
using Landau.Blitz.QuickNode.Models.UIModels;


namespace Landau.Blitz.QuickNode
{
    public class Processor
    {

        private void GenerateBlankForm()
        {
            try
            {
                QForm form = new QForm();
                form.Name = "Форма заявки";
                form.CreationDate = DateTime.Now;
                form.Id = 1;
                form.UpdateDate = DateTime.Now;

                QSheet sheet = new QSheet();
                sheet.Id = 1;
                sheet.Index = 1;
                sheet.Name = "1.Данные о клиенте";

                form.Sheets.Add(sheet);

                var currentSheet = form.Sheets.LastOrDefault();

                if (currentSheet != null)
                {
                    QBlock block = new QBlock();
                    block.Title = "Наименование компании и юридическая форма организации";
                    currentSheet.Blocks.Add(block);

                    QQuestion question = new QQuestion();
                    question.Id = 1;
                    question.Index = 1;

                    block.Questions.Add(question);


                    QField field = new QField();
                    field.Id = 1;
                    field.Index = 1;
                    field.Name = "Q1";
                    question.Fields.Add(field);

                    QElement nameOrganization = new QElement();
                    nameOrganization.ElementUiType = ElementUiType.TextInput;
                    nameOrganization.ElementVarType = ElementVarType.Text;
                    nameOrganization.UIElement = new UITextInput();

                    field.Elements.Add(nameOrganization);

                    QElement typeOrganization = new QElement();
                    typeOrganization.ElementUiType = ElementUiType.DropDown;
                    typeOrganization.ElementVarType = ElementVarType.Text;
                    typeOrganization.UIElement = new UIDropDownElement(0,new List<string>() {"ИП", "ТОО", "КХ"});
                    field.Elements.Add(typeOrganization);
                }


                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string serializeResult = serializer.Serialize(form);
                Console.WriteLine(serializeResult);
                Console.ReadKey();

            }
            catch (Exception e)
            {
                
                throw;
            }
        }

        public void DoIt()
        {
            try
            {
                GenerateBlankForm();   
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// get to new content
        /// </summary>
        /// <param name="name"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetToNewContent(string name, int id)
        {
            try
            {
                QForm form = new QForm();
                form.Name = name;
                form.CreationDate = DateTime.Now;
                form.Id = id;
                form.UpdateDate = DateTime.Now;
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                
                return serializer.Serialize(form);
                
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}

