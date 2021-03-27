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
    ///     The Debits Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DebitsController : ControllerBase
    {
        private readonly IRepoDebit _repoDebit;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public DebitsController(FPNgContext context)
        {
            _repoDebit = new RepoDebit(context);
        }

        /// <summary>
        ///     Return List of all Debits for given User using the View vwDebit
        ///     GET: api/Debits/{userId}/List
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<ActionResult<List<VwDebit>>>: List of Debits for the Authorized User</returns>
        [HttpGet("{userId}/List")]
        public async Task<ActionResult<List<VwDebit>>> GetDebits(Guid userId)
        {
            return await _repoDebit.GetDebits(userId);
        }

        /// <summary>
        ///     Get a specific Debit
        ///     GET: api/Debits/{id}
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<ActionResult<VwDebit>>: The requested Debit</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VwDebit>> GetDebit(int id)
        {
            VwDebit debit = await _repoDebit.GetDebit(id);
            if (debit == null)
            {
                return NotFound();
            }
            return debit;
        }

        /// <summary>
        ///     Update Existing Debit
        ///     PUT: api/Debits/{id}
        ///     Debit Model in the payload
        /// </summary>
        /// <param name="id">int: Debit Id</param>
        /// <param name="debit">Debit: The Edited Debit Model</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDebit(int id, Debit debit)
        {
            if (id != debit.PkDebit)
            {
                return BadRequest();
            }

            bool result = await _repoDebit.PutDebit(id, debit);
            return result ? (IActionResult)Accepted() : NotFound();
        }

        /// <summary>
        ///     Add new Debit
        ///     POST: api/Debits
        ///     New Debit Model in the payload
        /// </summary>
        /// <param name="debit">Debit: The input Debit Model</param>
        /// <returns>Task<ActionResult<Debit>>: Return the new Debit & Action State</returns>
        [HttpPost]
        public async Task<ActionResult<Debit>> PostDebit(Debit debit)
        {
            bool result = await _repoDebit.PostDebit(debit);
            return result ? Created("Created", debit) : (ActionResult<Debit>)NoContent();
        }

        /// <summary>
        ///     Delete a specific Debit
        ///     DELETE: api/Debits/5
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDebit(int id)
        {
            bool result = await _repoDebit.DeleteDebit(id);
            return result ? (IActionResult)Accepted() : NotFound();
        }
    }
}
