using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Landau.Blitz.Exporter.Models.ReportSchemaModels;
using Landau.Blitz.Exporter.Models.TableModels;

namespace Landau.Blitz.Exporter.Helpers
{
    public static class ParseTableHelper
    {
        /// <summary>
        /// parse cell
        /// </summary>
        /// <param name="project"></param>
        /// <param name="sCell"></param>
        /// <returns></returns>
        private static XCell ParseCell(object project, string sCell, bool isLoop =false)
        {
            try
            {
                sCell = sCell.Replace("\n", string.Empty);
                if (string.IsNullOrEmpty(sCell)) sCell = " ";
                if (sCell.Contains("{") || sCell.Contains("["))
                {
                    if (sCell.Contains("{"))
                    {
                        string value = VariablesHelper.InitVarInLine(project, sCell);
                        return new XCell() {Text = value};
                    }
                    else
                    {
                        string value = ArraysHelper.GetArrayValue(project, sCell,isLoop);
                        return new XCell() { Text = value };
                    }
                }
                else
                {
                    return new XCell() {Text = sCell};
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        /// <summary>
        /// parse cell
        /// </summary>
        /// <param name="project"></param>
        /// <param name="sCell"></param>
        /// <returns></returns>
        private static string  ParseLoopCell(object project, string sCell, bool isLoop = false)
        {
            try
            {
                sCell = sCell.Replace("\n", string.Empty);
                if (string.IsNullOrEmpty(sCell)) sCell = " ";
                if (sCell.Contains("{") || sCell.Contains("["))
                {
                    if (sCell.Contains("{"))
                    {
                        string value = VariablesHelper.InitVarInLine(project, sCell);
                        return value;
                    }
                    else
                    {
                        string value = ArraysHelper.GetArrayValue(project, sCell, isLoop);
                        return value;
                    }
                }
                else
                {
                    return  sCell ;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        /// <summary>
        /// parse row
        /// </summary>
        /// <param name="project"></param>
        /// <param name="sRow"></param>
        /// <returns></returns>
        private static XRow ParseRow(object project, string sRow,bool isLoop=false)
        {
            try
            {
                List<string> sCells = sRow.Split('|').ToList();
                XRow row = new XRow();

                
                    foreach (var sCell in sCells)
                    {
                        XCell cell = ParseCell(project, sCell, isLoop);
                        if (cell != null)
                            row.Cells.Add(cell);
                    }
               

                return row;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        /// parse row
        /// </summary>
        /// <param name="project"></param>
        /// <param name="sRow"></param>
        /// <returns></returns>
        private static List<XRow> ParseRows(object project, string sRow, bool isLoop = false)
        {
            try
            {
                List<string> sCells = sRow.Split('|').ToList();
                List<XRow> rows = new List<XRow>();
                XRow row = new XRow();
                List<string> loopList = new List<string>();
                   foreach (var sCell in sCells)
                    {
                        string loopElement = ParseLoopCell(project, sCell, true);
                        loopElement = loopElement.Replace(";;", ";");
                        loopList.Add(loopElement);
                    }

                if (loopList.Count > 0)
                {
                    string l = loopList[0];

                    int sepCount = l.Count(x => x == ';');

                    if (sepCount == 0)
                    {
                        foreach (var element in loopList)
                        {
                            row.Cells.Add(new XCell() {Text = element});
                        }
                        rows.Add(row);
                        return rows;
                    }
                    for (int i = 0; i < sepCount; i++)
                    {
                        bool isAdd = false;
                        row = new XRow();
                        foreach (var element in loopList)
                        {
                            List<string> t = element.Split(';').ToList();

                            //t = t.Where(s => !string.IsNullOrWhiteSpace(s))..ToList();
                            t.RemoveAll(str => String.IsNullOrWhiteSpace(str));
                            if (t.Count == sepCount)
                            {
                                if (t[i] != null)
                                {
                                    row.Cells.Add(new XCell() {Text = t[i].Replace(";","")});
                                    isAdd = true;
                                }
                                else
                                {
                                row.Cells.Add(new XCell() {Text = " "});

                                }
                            }
                            else
                            {
                                row.Cells.Add(new XCell() {Text = " "});
                            }

                        }
                        if (isAdd)
                        rows.Add(row);
                    }
                }
                   

                return rows;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        private static XTable CleanTable(XTable table)
        {
            try
            {
                int rIndex = 0;
                while (rIndex < table.Rows.Count)
                {
                    bool isDelete = true;
                    int cIndex = 0;
                    foreach (var cls in table.Rows[rIndex].Cells)
                    {
                        if (cIndex > 0)
                            if (!string.IsNullOrWhiteSpace(cls.Text) && !cls.Text.Equals("0") && !cls.Text.Equals(" 0 ") && !cls.Text.Equals(" 0") && !cls.Text.Equals("0 "))
                            {
                                isDelete = false;
                                break;

                            }

                        cIndex++;
                    }

                    if (isDelete)
                    {
                        table.Rows.Remove(table.Rows[rIndex]);
                    }
                    else
                    {
                        rIndex++;
                    }
                }
                return table;
            }
            catch (Exception e)
            {
                return table;
            }
        }
        /// <summary>
        /// parser rows
        /// </summary>
        /// <param name="table"></param>
        /// <param name="project"></param>
        /// <param name="element"></param>
        private static void ParseRows(XTable table, object project, ReportSchemaElement element)
        {
            try
            {
                List<string> sRows = element.Text.Split(';').ToList();
                if (sRows.Count>0)
                if (sRows[0].Equals("loop"))
                {
                    table.Loop = true;
                    if (element.Name.ToLower().Equals("опиу таблица"))
                    {
                        string r = "";
                    }
                    sRows.Remove(sRows[0]);
                }
                if (!table.Loop)
                {
                    foreach (var sRow in sRows)
                    {
                        if (!string.IsNullOrEmpty(sRow))
                        {
                            XRow row = ParseRow(project, sRow, table.Loop);
                            if (row != null)
                                table.Rows.Add(row);
                        }
                    }

                    if (element.Name.ToLower().Equals("баланс таблица"))
                    {
                        CleanTable(table);
                    }
                }
                else
                {
                    foreach (var sRow in sRows)
                    {
                        if (!string.IsNullOrEmpty(sRow))
                        {
                            List<XRow> row = ParseRows(project, sRow, table.Loop);
                            if (row != null)
                                table.Rows.AddRange(row);
                        }
                    }
                    CleanTable(table);

                }
            }
            catch (Exception e)
            {
            }
        }

        /// <summary>
        /// parse table
        /// </summary>
        /// <returns></returns>
        public static XTable ParseTable(object project, ReportSchemaElement element)
        {
            try
            {
                XTable table = new XTable();
                ParseRows(table,project,element);
                return table;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
