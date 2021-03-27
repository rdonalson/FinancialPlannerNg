using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Interface;
using FPNg.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FPNg.API.Controllers
{
    /// <summary>
    ///     The Initial Amount Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class InitialAmountsController : ControllerBase
    {
        private readonly IRepoInitialAmount _repoInitialAmount;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public InitialAmountsController(FPNgContext context)
        {
            _repoInitialAmount = new RepoInitialAmount(context);
        }

        /// <summary>
        ///     Get a specific InitialAmount with the User OID
        ///     GET: api/InitialAmounts/{userId}
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<ActionResult<InitialAmount>>: The requested Debit</returns>
        [HttpGet("{userId}")]
        public async Task<ActionResult<InitialAmount>> GetDebit(Guid userId)
        {
            InitialAmount initialAmount = await _repoInitialAmount.GetInitialAmount(userId);
            if (initialAmount == null)
            {
                return NotFound();
            }
            return initialAmount;
        }

        /// <summary>
        ///     Add new Initial Amount
        ///     POST: api/InitialAmounts/{userId}
        ///     New Debit Model in the payload
        /// </summary>
        /// <param name="initialAmount">InitialAmount: The input Initial Amount Model</param>
        /// <returns>Task<ActionResult<InitialAmount>>: Return the new Debit & Action State</returns>
        [HttpPost]
        public async Task<ActionResult<InitialAmount>> PostDebit(InitialAmount initialAmount)
        {
            bool result = await _repoInitialAmount.PostInitialAmount(initialAmount);
            return result ? Created("Created", initialAmount) : (ActionResult<InitialAmount>) BadRequest();
        }

        /// <summary>
        ///     Update Existing initial Amount
        ///     PUT: api/Credits/{userId}
        ///     initial Amount Model in the payload
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="initialAmount">InitialAmount: The Edited Initial Amount Model</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpPut("{userId}")]
        public async Task<IActionResult> PutCredit(Guid userId, InitialAmount initialAmount)
        {
            if (userId != initialAmount.UserId)
            {
                return BadRequest();
            }

            bool result = await _repoInitialAmount.PutInitialAmount(userId, initialAmount);
            return result ? (IActionResult) Accepted() : NotFound();
        }

    }
}
