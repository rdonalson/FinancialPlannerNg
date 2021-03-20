using FPNg.API.Data.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{
    public interface IRepoCredit
    {
        Task<Credit> GetCredit(int id, string userName);
        Task<List<Credit>> GetCredits(string userName);
    }
}