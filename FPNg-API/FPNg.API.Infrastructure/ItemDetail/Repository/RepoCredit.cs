using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Interface;
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
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;

        /// <summary>
        ///     Credit Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoCredit(FPNgContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Return List of all Credits for given User
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<List<Credit>>: List of Credits for the Authorized User</returns>
        public async Task<List<Credit>> GetCredits(Guid userId)
        {
            try
            {
                /* Diagnostic: Error Handling */
                //var x = 3; 
                //var y = 0;
                //int z = x / y;
                return await _context.Credits.Where(d => d.UserId == userId).Include(d => d.Period).ToListAsync();
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Get a specific Credit
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<Credit>: The requested Credit</returns>
        public async Task<Credit> GetCredit(int id)
        {
            try
            {
                return await _context.Credits.FindAsync(id);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Update Existing Credit
        /// </summary>
        /// <param name="id">int: Credit Id</param>
        /// <param name="credit">Credit: The Edited Credit Model</param>
        /// <returns>Task<bool>: Was Credit Updated?</returns>
        public async Task<bool> PutCredit(int id, Credit credit)
        {
            try
            {
                _context.Entry(credit).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!CreditExists(id))
                {
                    _log.Error("Credit not found");
                    return false;
                }
                _log.Error(ex.ToString());
                return false;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Add new Credit
        /// </summary>
        /// <param name="credit">Credit: The input Credit Model</param>
        /// <returns>Task<bool>: Was the credit created? T/F</returns>
        public async Task<bool> PostCredit(Credit credit)
        {
            try
            {
                _context.Credits.Add(credit);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Delete a specific Credit
        /// </summary>
        /// <param name="id">int: Id of the Credit</param>
        /// <returns>Task<bool>: Was the Credit Deleted?</returns>
        public async Task<bool> DeleteCredit(int id)
        {
            try
            {
                var credit = await _context.Credits.FindAsync(id);
                _context.Credits.Remove(credit);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Verify Credit exists or not
        /// </summary>
        /// <param name="id">int: Credit Id</param>
        /// <returns>Boolean: Does the Credit Exist?</returns>
        private bool CreditExists(int id)
        {
            return _context.Credits.Any(e => e.PkCredit == id);
        }
    }
}
