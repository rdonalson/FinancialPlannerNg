using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.Display.Interface
{
    public interface IRepoDisplay
    {
        Task<List<LedgerVM>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, int groupingTranform);
    }
}