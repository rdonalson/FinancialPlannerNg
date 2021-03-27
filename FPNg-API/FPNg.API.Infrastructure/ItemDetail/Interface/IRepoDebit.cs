using FPNg.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Debit Repository Interface 
    /// </summary>
    public interface IRepoDebit
    {
        Task<List<VwDebit>> GetDebits(Guid userId);

        Task<VwDebit> GetDebit(int id);

        Task<bool> PutDebit(int id, Debit debit);

        Task<bool> PostDebit(Debit debit);

        Task<bool> DeleteDebit(int id);
    }
}