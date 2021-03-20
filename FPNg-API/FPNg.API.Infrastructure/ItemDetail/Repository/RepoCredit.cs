using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Credit Repository
    /// </summary>
    public class RepoCredit : IRepoCredit
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;
        public RepoCredit(FPNgContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Return List of all Credits
        /// </summary>
        /// <param name="userName">userName</param>
        /// <returns>IQueryable(Credit)</returns>
        public async Task<List<Credit>> GetCredits(string userName)
        {
            try
            {
                var x = 3; 
                var y = 0;
                int z = x / y;
                return await _context.Credits.Where(d => d.UserName == userName).Include(d => d.Period).ToListAsync();
            }
            catch (Exception ex)
            {
                log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Get a specific Credit
        /// </summary>
        /// <param name="id">int?</param>
        /// <param name="userName">string</param>
        /// <returns>Credit</returns>
        public async Task<Credit> GetCredit(int id, string userName)
        {
            try
            {
                return await _context.Credits.FirstOrDefaultAsync(d => d.PkCredit == id && d.UserName == userName);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
