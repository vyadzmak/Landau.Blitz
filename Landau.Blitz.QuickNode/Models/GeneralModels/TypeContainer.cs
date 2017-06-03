using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Landau.Blitz.QuickNode.Models.GeneralModels
{
    /// <summary>
    /// type of fields
    /// </summary>
   public enum ElementVarType { Numeric, Text, Date}

    /// <summary>
    /// ui type field
    /// </summary>
    public enum ElementUiType {Label, TextInput, NumericInput, DateInput, DropDown }
    /// <summary>
    /// type of the question
    /// </summary>
    public enum SystemQuestionType { Input, Calculate }

    /// <summary>
    /// 
    /// </summary>
    public enum MultiplicityQuestionType { Single, Multiple } 

}
