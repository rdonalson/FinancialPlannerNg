using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Period Repository
    /// </summary>
    public class RepoPeriod : IRepoPeriod
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoPeriod(FPNgContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Return List of all Periods for use in UI Period Selectors
        /// </summary>
        /// <returns>Task<List<Period>>: List of Period for the Authorized User</returns>
        public async Task<List<Period>> GetPeriods()
        {
            try
            {
                return await _context.Periods.ToListAsync();
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Get a specific Period
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<Period>: The requested Period</returns>
        public async Task<Period> GetPeriod(int id)
        {
            try
            {
                return await _context.Periods.FindAsync(id);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }
    }
}
