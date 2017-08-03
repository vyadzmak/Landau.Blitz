using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class VariablesHelper
    {



        private static List<string> GetElementNames(string line)
        {
            try
            {
                int startIndex = 0;
                List<string> variables = new List<string>();
                while (true)
                {

                    if (line.Contains("{") && line.Contains("}"))
                    {
                        int leftPos = line.IndexOf("{");
                        int rightPos = line.IndexOf("}");
                        if (leftPos != -1 && rightPos != -1)
                        {
                            string content = line.Substring(leftPos + 1, rightPos - leftPos - 1);
                            variables.Add(content);
                            line = line.Remove(leftPos, 1);
                            line = line.Remove(rightPos - 1, 1);
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                


                return variables;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private static KeyValuePair<string, object> GetToKey(Dictionary<string, object> ob, string name)
        {
            try
            {
                foreach (var e in ob)
                {
                    if (e.Key.Equals(name)) return e;
                }
                return new KeyValuePair<string, object>();
            }
            catch (Exception e)
            {
                return new KeyValuePair<string, object>();
            }
        }
        /// <summary>
        /// get var value
        /// </summary>
        /// <returns></returns>
        private static string GetVariableValue(object project, string varName)
        {
            try
            {
                List<string> elements = varName.Split('.').ToList();
                Dictionary<string, object> ob = project as Dictionary<string, object>;
                KeyValuePair<string,object> currentElement = new KeyValuePair<string, object>();
                foreach (var element in elements)
                {
                    KeyValuePair<string,object> t = GetToKey(ob, element);
                    currentElement = t;
                    ob = t.Value as Dictionary<string, object>;
                }

                return currentElement.Value.ToString();
            }
            catch (Exception e)
            {
                return "";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="project"></param>
        /// <param name="line"></param>
        /// <returns></returns>
        public static string InitVarInLine(object project, string line)
        {
            try
            {
                if (!line.Contains('{') || !line.Contains('}')) return line;
                List<string> elements = GetElementNames(line);

                line = line.Replace('{', ' ');
                line = line.Replace('}', ' ');

                foreach (var element in elements)
                {
                    string value = GetVariableValue(project, element);

                    line = line.Replace(element, value);
                }

                return line;
            }
            catch (Exception e)
            {
                return line;
            }
        } 
    }
}
