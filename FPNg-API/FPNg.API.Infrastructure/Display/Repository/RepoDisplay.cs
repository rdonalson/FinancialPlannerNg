using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.Display.Repository
{
    /// <summary>
    ///     Display Repository
    /// </summary>
    public class RepoDisplay : IRepoDisplay
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoDisplay(FPNgContext context)
        {
            _context = context;
        }

        public async Task<List<Ledger>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, int groupingTranform)
        {
            try
            {
                return await _context.Ledger.FromSqlInterpolated($"EXEC [ItemDetail].[spCreateLedgerReadout] {timeFrameBegin}, {timeFrameEnd}, {userId}, {groupingTranform}").ToListAsync();
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }


    }
}
