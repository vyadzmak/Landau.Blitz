using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class TextProcessHelper
    {
        private static string ReplaceElements(string line, string settings)
        {
            try
            {
                List<string> elements = settings.Split('~').ToList();
                List<string> cElements = line.Split(';').ToList();
                foreach (var element in elements)
                {
                    List<string> repElements = element.Split('-').ToList();

                    if (repElements.Count == 2)
                    {
                        string from = repElements[0];
                        string to = repElements[1];
                        int index = cElements.IndexOf(from);
                        if (index != -1)
                            cElements[index] = to;
                    }
                }
                string result = "";
                foreach (var cElement in cElements)
                {
                    result += cElement + ";";
                }
                return result;
            }
            catch (Exception e)
            {
                return line;
            }
        }


        public static string ConvertElements(string line, string settings)
        {
            try
            {
                line = line.Replace(";", "");
                switch (settings)
                {
                    case "date":
                        DateTime time = DateTime.Parse(line);
                        string res = time.ToShortDateString();
                        return res;
                        break;
                        
                }
                return line;
            }
            catch (Exception e)
            {
                return "";
            }
        }
        /// <summary>
        /// /
        /// </summary>
        /// <param name="line"></param>
        /// <param name="pattern"></param>
        /// <returns></returns>
        public static string ProcessFunction(string line, string pattern)
        {
            try
            {
                List<string> elements = pattern.Split(':').ToList();
                if (elements.Count == 2)
                {
                    string eName = elements[0];

                    int lIndex = elements[1].IndexOf("(");
                    int rIndex = elements[1].IndexOf(")");
                    string eOperation = elements[1].Substring(0,lIndex);

                    eOperation = eOperation.ToLower();

                    string content = elements[1].Substring(lIndex + 1, rIndex - lIndex-1);
                    switch (eOperation)
                    {
                        case "replace":
                            return ReplaceElements(line, content);
                            break;

                        case "convert":
                            return ConvertElements(line, content);
                            break;
                                
                    }


                }
                    
                return line;
            }
            catch (Exception e)
            {
                return "";
            }
        }

        public static string ProcessFunctionLoop(string arr, string pattern)
        {
            try
            {
                List<string> lines = arr.Split(';').ToList();
                string result = "";
                foreach (var line in lines)
                {
                    if (!string.IsNullOrEmpty(line))
                    {

                        List<string> elements = pattern.Split(':').ToList();
                        if (elements.Count == 2)
                        {
                            string eName = elements[0];

                            int lIndex = elements[1].IndexOf("(");
                            int rIndex = elements[1].IndexOf(")");
                            string eOperation = elements[1].Substring(0, lIndex);

                            eOperation = eOperation.ToLower();

                            string content = elements[1].Substring(lIndex + 1, rIndex - lIndex - 1);
                            switch (eOperation)
                            {
                                case "replace":
                                    result += ReplaceElements(line, content) + ";";
                                    break;

                                case "convert":
                                    result += ConvertElements(line, content) + ";";
                                    break;

                            }
                        }
                        else
                        {
                            return arr;
                        }

                    }
                }

                return result;
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}
