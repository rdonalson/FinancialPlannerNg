using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Interface;
using FPNg.API.Infrastructure.Display.Models;
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
        private readonly IDataTransformation _dataTransformation;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoDisplay(FPNgContext context)
        {
            _context = context;
            _dataTransformation = new DataTransformation();
        }

        /// <summary>
        ///     Calls the "spCreateLedgerReadout" stored procedure which returns a flatfile of data item
        ///     that then supplied to the DataTransformation class that will transform the data into
        ///     a form that can be used by the UI Ledger and Chart
        /// </summary>
        /// <param name="timeFrameBegin">DateTime</param>
        /// <param name="timeFrameEnd">DateTime</param>
        /// <param name="userId">Guid</param>
        /// <param name="groupingTranform">bool</param>
        /// <returns>async Task<List<LedgerVM>></returns>
        public async Task<List<LedgerVM>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, bool groupingTranform)
        {
            try
            {
                List<Ledger> ledger = await _context.Ledgers.FromSqlInterpolated($"EXEC [ItemDetail].[spCreateLedgerReadout] {timeFrameBegin}, {timeFrameEnd}, {userId}, {groupingTranform}").ToListAsync();
                return _dataTransformation.TransformLedgerData(ledger); 
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }
    }
}
