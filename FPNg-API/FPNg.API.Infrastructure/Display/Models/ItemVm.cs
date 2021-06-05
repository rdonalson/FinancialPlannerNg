namespace FPNg.API.Infrastructure.Display.Models
{
    public class ItemVM
	{
		public int? RollupKey { get; set; }
		public int? Year { get; set; }
		public int? ItemKey { get; set; }
		public string OccurrenceDate { get; set; }
		public int? ItemType { get; set; }
		public string PeriodName { get; set; }
		public string Name { get; set; }
		public double? Amount { get; set; }
	}
}
