using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using FPNg.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPNg.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PeriodsController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IRepoPeriod _repoPeriod;

        /// <summary>
        ///     Periods Controller Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public PeriodsController(FPNgContext context)
        {
            _repoPeriod = new RepoPeriod(context);
        }

        /// <summary>
        ///     Gets all of the Periods for use in UI Selectors
        ///     GET: api/Periods
        /// </summary>
        /// <returns>Task<ActionResult<List<Period>>></returns>
        [HttpGet]
        public async Task<ActionResult<List<Period>>> GetPeriods()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _repoPeriod.GetPeriods();
        }

        /// <summary>
        ///     Get a specific Period
        ///     GET: api/Periods/{id}
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<ActionResult<Period>>: The requested Period</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Period>> GetPeriod(int id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            var period = await _repoPeriod.GetPeriod(id);

            if (period == null)
            {
                return NotFound();
            }
            return period;
        }


    }
}
