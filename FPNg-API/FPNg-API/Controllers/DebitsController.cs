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
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IRepoDebit _repoDebit;

        /// <summary>
        ///     Debits Controller Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public DebitsController(FPNgContext context)
        {
            _repoDebit = new RepoDebit(context);
        }

        /// <summary>
        ///     Return List of all Debits for given User
        ///     GET: api/Debits/{userId}
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<ActionResult<List<Debit>>>: List of Debits for the Authorized User</returns>
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Debit>>> GetDebits(Guid userId)
        {
            return await _repoDebit.GetDebits(userId);
        }

        /// <summary>
        ///     Add new Debit
        ///     Get a specific Debit
        ///     GET: api/Debits/{userId}/{id}
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<ActionResult<Debit>>: The requested Debit</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Debit>> GetDebit(int id)
        {
            Debit Debit = await _repoDebit.GetDebit(id);
            if (Debit == null)
            {
                _log.Error("Debit not found");
                return NotFound();
            }
            return Debit;
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
            return !result ? NotFound() : (IActionResult)NoContent();
        }

        /// <summary>
        ///     Add new Debit
        ///     POST: api/Debits
        ///     New Debit Model in the payload
        /// </summary>
        /// <param name="debit">Debit: The input Debit Model</param>
        /// <returns>Task<bool>: Return the Debit & It's new Id or Null</returns>
        [HttpPost]
        public async Task<ActionResult<Debit>> PostDebit(Debit debit)
        {
            bool result = await _repoDebit.PostDebit(debit);
            return result ? debit : (ActionResult<Debit>)NoContent();
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
            return !result ? NotFound() : (IActionResult)NoContent();
        }
    }
}
