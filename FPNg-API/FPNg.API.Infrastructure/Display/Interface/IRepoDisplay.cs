using FPNg.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.Display.Interface
{
    public interface IRepoDisplay
    {
        Task<List<Ledger>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, int groupingTranform);
    }
}