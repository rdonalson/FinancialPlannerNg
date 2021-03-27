using FPNg.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Credit Repository Interface 
    /// </summary>
    public interface IRepoCredit
    {
        Task<List<VwCredit>> GetCredits(Guid userId);

        Task<VwCredit> GetCredit(int id);

        Task<bool> PutCredit(int id, Credit credit);

        Task<bool> PostCredit(Credit credit);

        Task<bool> DeleteCredit(int id);
    }
}