using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Helpers
{
    public class ArraysHelper
    {
        private static List<string> GetElementNames(string line)
        {
            try
            {
                int startIndex = 0;
                List<string> variables = new List<string>();
                while (true)
                {

                    if (line.Contains("[") && line.Contains("]"))
                    {
                        int leftPos = line.IndexOf("[");
                        int rightPos = line.IndexOf("]");
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
        private static string GetVariableValue(object project, string varName,bool isLoop=false)
        {
            try
            {
                List<string> elements = varName.Split('.').ToList();
                Dictionary<string, object> ob = project as Dictionary<string, object>;
                KeyValuePair<string, object> currentElement = new KeyValuePair<string, object>();
               // elements.Remove(elements[elements.Count-1]);
                if (isLoop)
                {
                    string oo = "";
                }
                foreach (var element in elements)
                {
                    if (!element.Contains("*"))
                    {
                        KeyValuePair<string, object> t = GetToKey(ob, element);

                        currentElement = t;
                        ob = t.Value as Dictionary<string, object>;
                    }
                    else
                    if (element.ToLower().StartsWith("*all"))
                    {
                        string pattern = "";

                        if (element.Contains("<") && element.Contains(">"))
                        {
                            int firstElement = element.IndexOf("<")+1;
                            int lastElement = element.IndexOf(">");
                            int length = lastElement - firstElement;
                            if (length > 0 && firstElement > 0)
                            {
                                pattern = element.Substring(firstElement, length);
                            }
                        }
                        
                        object[] ar = currentElement.Value as object[];

                        string result = "";
                        int counter = 0;
                        foreach (var o in ar)
                        {
                            result += o.ToString();
                            if (counter < ar.Length - 1)
                                result += ";";
                            counter++;
                        }
                        if (!string.IsNullOrEmpty(pattern))
                        result = TextProcessHelper.ProcessFunction(result, pattern);
                        return result;

                    }
                    else if (element.ToLower().StartsWith("*value"))
                    {
                        string pattern = "";

                        if (element.Contains("<") && element.Contains(">"))
                        {
                            int firstElement = element.IndexOf("<") + 1;
                            int lastElement = element.IndexOf(">");
                            int length = lastElement - firstElement;
                            if (length > 0 && firstElement > 0)
                            {
                                pattern = element.Substring(firstElement, length);
                            }
                        }
                        object[] ar = currentElement.Value as object[];
                        string result = "";
                        foreach (var o in ar)
                        {
                            Dictionary<string,object> fields= o as Dictionary<string,object>;

                            string pat = element.Replace("*value","");
                             pat = pat.Replace("<","");
                             pat = pat.Replace(">","");
                            if (pat.Contains(":"))
                            {
                                int ind = pat.IndexOf(":");
                                if (ind != -1) pat = pat.Substring(0, ind);
                            }
                            if (fields != null)
                            {
                                var f = fields.FirstOrDefault(x => x.Key == pat);
                                if (f.Value!=null)
                                result += f.Value + ";";
                            }
                        }
                        if (!string.IsNullOrEmpty(pattern))
                        {
                            if (!isLoop)
                            {
                                result = TextProcessHelper.ProcessFunction(result, pattern);
                                
                            }
                            else
                            {
                                result = TextProcessHelper.ProcessFunctionLoop(result, pattern);

                            }
                        }
                        return result;
                    }
                }

                return currentElement.Value.ToString();
            }
            catch (Exception e)
            {
                return "";
            }
        }
        public static string InitVarInLine(object project, string line, bool isLoop =false)
        {
            try
            {
                if (!line.Contains('[') || !line.Contains(']')) return line;
                List<string> elements = GetElementNames(line);

                line = line.Replace('[', ' ');
                line = line.Replace(']', ' ');

                foreach (var element in elements)
                {
                    string value = GetVariableValue(project, element,isLoop);

                    line = line.Replace(element, value);
                }

                return line;
            }
            catch (Exception e)
            {
                return line;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public static string GetArrayValue(object project, string line, bool isLoop=false)
        {
            try
            {
                
                return InitVarInLine(project, line,isLoop); ;
            }
            catch (Exception e)
            {
                return " ";
            }
        }
    }
}

