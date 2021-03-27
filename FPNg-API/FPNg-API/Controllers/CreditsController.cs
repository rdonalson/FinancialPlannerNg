using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Interface;
using FPNg.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Controllers
{
    /// <summary>
    ///     The Credits Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CreditsController : ControllerBase
    {
        private readonly IRepoCredit _repoCredit;

        /// <summary>
        ///     Credits Controller Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public CreditsController(FPNgContext context)
        {
            _repoCredit = new RepoCredit(context);
        }

        /// <summary>
        ///     Return List of all Credits for given User using the View vwCredit
        ///     GET: api/Credits/{userId}/List
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<ActionResult<List<VwCredit>>>: List of Credits for the Authorized User</returns>
        [HttpGet("{userId}/List")]
        public async Task<ActionResult<List<VwCredit>>> GetCredits(Guid userId)
        {
            return await _repoCredit.GetCredits(userId);
        }

        /// <summary>
        ///     Get a specific Credit
        ///     GET: api/Credits/{id}
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<ActionResult<VwCredit>>: The requested Credit</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VwCredit>> GetCredit(int id)
        {
            VwCredit credit = await _repoCredit.GetCredit(id);
            if (credit == null)
            {
                return NotFound();
            }
            return credit;
        }

        /// <summary>
        ///     Update Existing Credit
        ///     PUT: api/Credits/{id}
        ///     Credit Model in the payload
        /// </summary>
        /// <param name="id">int: Credit Id</param>
        /// <param name="credit">Credit: The Edited Credit Model</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCredit(int id, Credit credit)
        {
            if (id != credit.PkCredit)
            {
                return BadRequest();
            }

            bool result = await _repoCredit.PutCredit(id, credit);
            return result ? (IActionResult)Accepted() : NotFound();
        }

        /// <summary>
        ///     Add new Credit
        ///     POST: api/Credits
        ///     New Credit Model in the payload
        /// </summary>
        /// <param name="credit">Credit: The input Credit Model</param>
        /// <returns>Task<ActionResult<Credit>>: Return the new Credit & Action State</returns>
        [HttpPost]
        public async Task<ActionResult<Credit>> PostCredit(Credit credit)
        {
            bool result = await _repoCredit.PostCredit(credit);
            return result ? Created("Created", credit) : (ActionResult<Credit>)NoContent();
        }

        /// <summary>
        ///     Delete a specific Credit
        ///     DELETE: api/Credits/5
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCredit(int id)
        {
            bool result = await _repoCredit.DeleteCredit(id);
            return result ? (IActionResult)Accepted() : NotFound();
        }
    }
}
