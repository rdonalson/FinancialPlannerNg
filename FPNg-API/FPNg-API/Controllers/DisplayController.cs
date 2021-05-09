using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.Display.Interface;
using FPNg.API.Infrastructure.Display.Repository;
using FPNg.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IRepoDisplay _repoDisplay;

        /// <summary>
        ///     Display Controller Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public DisplayController(FPNgContext context)
        {
            _repoDisplay = new RepoDisplay(context);
        }

        /// <summary>
        /// Calls the "Create Ledger Readout" procedure that generates the Ledger Output;
        /// which contains a forecasted Cronological list of credit/debit transactions with a running total 
        /// out to a future point in time.
        /// The timeframe is set by the user
        /// -------------------------------------------------------------
        /// EXEC @return_value = [ItemDetail].[spCreateLedgerReadout]
		///     @TimeFrameBegin = '2021-01-01',
		///     @TimeFrameEnd = '2021-12-31',
		///     @UserId = '8fdbe29e-f25f-450d-b179-92973e2bf7ba',
		///     @GroupingTranform = 0
        /// </summary>
        /// <param name="input">LedgerParams: Parameters for input into procedure</param>
        /// <returns>Task<ActionResult<List<Ledger>>>: A ledger of financial tansactions for the Authorized User</returns>
        [HttpPost]
        public async Task<ActionResult<List<Ledger>>> createLedger(LedgerParams input)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _repoDisplay.CreateLedger(input.TimeFrameBegin, input.TimeFrameEnd, input.UserId, input.GroupingTranform);
        }


    }


}
