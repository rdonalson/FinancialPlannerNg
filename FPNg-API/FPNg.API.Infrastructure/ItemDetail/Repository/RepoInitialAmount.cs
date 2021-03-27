using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Initial Amount Repository
    /// </summary>
    public class RepoInitialAmount : IRepoInitialAmount
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPNgContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public RepoInitialAmount(FPNgContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Get a specific Initial Amount by User OID
        ///     There will always only be one per User
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<InitialAmount>: The requested Initial Amount</returns>
        public async Task<InitialAmount> GetInitialAmount(Guid userId)
        {
            try
            {
                return await _context.InitialAmounts.SingleOrDefaultAsync(i => i.UserId == userId);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Add new Initial Amount 
        ///     Since there is only one record for each user, supply in the User OID and check to
        ///     make sure that a records doesn't already exist.
        /// </summary>
        /// <param name="initialAmount">InitialAmount: The input Initial Amount Model</param>
        /// <returns>Task<bool>: Was the Initial Amount created? T/F</returns>
        public async Task<bool> PostInitialAmount(InitialAmount initialAmount)
        {
            try
            {
                if (!InitialAmountExists(initialAmount.UserId))
                {
                    _context.InitialAmounts.Add(initialAmount);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    _log.Error($"Initial Amount already exists for this user: {initialAmount.UserId}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Update Existing Initial Amount
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="initialAmount">InitialAmount: The input Initial Amount Model</param>
        /// <returns>Task<bool>: Was Initial Amount Updated?</returns>
        public async Task<bool> PutInitialAmount(Guid userId, InitialAmount initialAmount)
        {
            try
            {
                _context.Entry(initialAmount).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!InitialAmountExists(userId))
                {
                    _log.Error("Initial Amount not found");
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
        ///     Verify whether the Initial Amount for this UserId exists
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Boolean: Does the InitialAmount Exist?</returns>
        private bool InitialAmountExists(Guid userId)
        {
            return _context.InitialAmounts.Any(e => e.UserId == userId);
        }
    }
}
