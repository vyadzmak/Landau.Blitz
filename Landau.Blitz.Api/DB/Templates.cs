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
    
    public partial class Templates
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Templates()
        {
            this.CreditRequests = new HashSet<CreditRequests>();
        }
    
        public int Id { get; set; }
        public int UserCreatorId { get; set; }
        public Nullable<int> ClientId { get; set; }
        public string Name { get; set; }
        public string Template { get; set; }
        public System.DateTime CreationDate { get; set; }
        public Nullable<System.DateTime> LastUpdateDate { get; set; }
        public string Description { get; set; }
    
        public virtual Clients Clients { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CreditRequests> CreditRequests { get; set; }
        public virtual Users Users { get; set; }
    }
}
