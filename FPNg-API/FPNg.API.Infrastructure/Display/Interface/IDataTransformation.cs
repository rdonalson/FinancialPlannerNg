using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Infrastructure.Display.Repository
{
    public interface IDataTransformation
    {
        List<LedgerVM> TransformLedgerData(List<Ledger> ledger);
    }
}