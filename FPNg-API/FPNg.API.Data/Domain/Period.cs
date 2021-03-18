using System.Collections.Generic;

namespace FPNg.API.Data.Domain
{
    public partial class Period
    {
        public Period()
        {
            Credits = new HashSet<Credit>();
            Debits = new HashSet<Debit>();
        }

        public int PkPeriod { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Credit> Credits { get; set; }
        public virtual ICollection<Debit> Debits { get; set; }
    }
}
