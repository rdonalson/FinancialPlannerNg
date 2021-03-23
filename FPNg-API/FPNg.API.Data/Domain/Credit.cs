using System;

namespace FPNg.API.Data.Domain
{
    public class Credit
    {
        public int PkCredit { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public decimal? Amount { get; set; }
        public int? FkPeriod { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? WeeklyDow { get; set; }
        public int? EverOtherWeekDow { get; set; }
        public int? BiMonthlyDay1 { get; set; }
        public int? BiMonthlyDay2 { get; set; }
        public int? MonthlyDom { get; set; }
        public int? Quarterly1Month { get; set; }
        public int? Quarterly1Day { get; set; }
        public int? Quarterly2Month { get; set; }
        public int? Quarterly2Day { get; set; }
        public int? Quarterly3Month { get; set; }
        public int? Quarterly3Day { get; set; }
        public int? Quarterly4Month { get; set; }
        public int? Quarterly4Day { get; set; }
        public int? SemiAnnual1Month { get; set; }
        public int? SemiAnnual1Day { get; set; }
        public int? SemiAnnual2Month { get; set; }
        public int? SemiAnnual2Day { get; set; }
        public int? AnnualMoy { get; set; }
        public int? AnnualDom { get; set; }
        public bool DateRangeReq { get; set; }

        public virtual Period Period { get; set; }
    }
}
