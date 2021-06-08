using System;

namespace FPNg.API.Models
{
    public class LedgerParams
    {
        public DateTime TimeFrameBegin { get; set; }
        public DateTime TimeFrameEnd { get; set; }
        public Guid UserId { get; set; }
        public bool GroupingTransform { get; set; }
    }
}
