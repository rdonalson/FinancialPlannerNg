using System;
using System.Collections.Generic;

namespace FPNg.API.Infrastructure.Display.Models
{
    public class LedgerVM
	{
        public LedgerVM()
        {
			Items = new List<ItemVM>();
		}
		public int RollupKey { get; set; }
		public int Year { get; set; }
		public DateTime WDate { get; set; }
		public double CreditSummary { get; set; }
		public double DebitSummary { get; set; }
		public double Net { get; set; }
		public double RunningTotal { get; set; }
		public List<ItemVM> Items { get; set; }
    }
}
