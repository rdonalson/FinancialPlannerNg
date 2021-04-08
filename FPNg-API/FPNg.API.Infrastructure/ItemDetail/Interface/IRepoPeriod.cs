using FPNg.API.Data.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Period Repository Interface 
    /// </summary>
    public interface IRepoPeriod
    {
        Task<Period> GetPeriod(int id);
        Task<List<Period>> GetPeriods();
    }
}