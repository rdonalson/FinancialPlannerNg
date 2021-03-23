using FPNg.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Interface for the Debit Repository
    /// </summary>
    public interface IRepoDebit
    {
        /// <summary>
        ///     Return List of all Debits for given User
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<List<Debit>>: List of Debits for the Authorized User</returns>
        Task<List<Debit>> GetDebits(Guid userId);

        /// <summary>
        ///     Get a specific Debit
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<Debit>: The requested Debit</returns>
        Task<Debit> GetDebit(int id);

        /// <summary>
        ///     Update Existing Debit
        /// </summary>
        /// <param name="id">int: Debit Id</param>
        /// <param name="Debit">Debit: The Edited Debit Model</param>
        /// <returns>Task<bool>: Was Debit Updated?</returns>
        Task<bool> PutDebit(int id, Debit debit);

        /// <summary>
        ///     Add new Debit
        /// </summary>
        /// <param name="Debit">Debit: The input Debit Model</param>
        /// <returns>Task<bool>: Was the Debit created? T/F</returns>
        Task<bool> PostDebit(Debit debit);

        /// <summary>
        ///     Delete a specific Debit
        /// </summary>
        /// <param name="id">int: Id of the Debit</param>
        /// <returns>Task<bool>: Was the Debit Deleted?</returns>
        Task<bool> DeleteDebit(int id);
    }
}