//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Landau.Blitz.Api.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class Projects
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> CreationDate { get; set; }
        public int CreatorId { get; set; }
        public string ProjectContent { get; set; }
        public int ProjectStateId { get; set; }
        public Nullable<int> ClientId { get; set; }
    
        public virtual Clients Clients { get; set; }
        public virtual ProjectStates ProjectStates { get; set; }
        public virtual Users Users { get; set; }
    }
}
