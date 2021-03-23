using FPNg.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Interface for the Credit Repository
    /// </summary>
    public interface IRepoCredit
    {
        /// <summary>
        ///     Return List of all Credits for given User
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<List<Credit>>: List of Credits for this user</returns>
        Task<List<Credit>> GetCredits(Guid userId);

        /// <summary>
        ///     Get a specific Credit
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<Credit>: The requested Credit</returns>
        Task<Credit> GetCredit(int id);

        /// <summary>
        ///     Update Existing Credit
        /// </summary>
        /// <param name="id">int: Credit Id</param>
        /// <param name="credit">Credit: The Edited Credit Model</param>
        /// <returns>Task<bool>: Was Credit Updated?</returns>
        Task<bool> PutCredit(int id, Credit credit);

        /// <summary>
        ///     Add new Credit
        /// </summary>
        /// <param name="credit">Credit: The input Credit Model</param>
        /// <returns>Task<bool>: Was the credit created? T/F</returns>
        Task<bool> PostCredit(Credit credit);

        /// <summary>
        ///     Delete a specific Credit
        /// </summary>
        /// <param name="id">int: Id of the Credit</param>
        /// <returns>Task<bool>: Was the Credit Deleted?</returns>
        Task<bool> DeleteCredit(int id);
    }
}