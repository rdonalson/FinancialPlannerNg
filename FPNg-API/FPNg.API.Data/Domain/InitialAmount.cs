using System;

namespace FPNg.API.Data.Domain
{
    public partial class InitialAmount
    {
        public int PkInitialAmount { get; set; }
        public Guid UserId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? BeginDate { get; set; }
    }
}
