using FPNg.API.Data.Domain;
using System;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.ItemDetail.Interface
{
    public interface IRepoInitialAmount
    {
        Task<InitialAmount> GetInitialAmount(Guid userId);
        Task<bool> PostInitialAmount(InitialAmount initialAmount);
        Task<bool> PutInitialAmount(Guid userId, InitialAmount initialAmount);
    }
}