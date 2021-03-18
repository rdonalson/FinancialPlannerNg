using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPNg.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditsController : ControllerBase
    {
        private readonly FPNgContext _context;

        public CreditsController(FPNgContext context)
        {
            _context = context;
        }

        // GET: api/Credits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Credit>>> GetCredits()
        {
            return await _context.Credits.ToListAsync();
        }

        // GET: api/Credits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Credit>> GetCredit(int id)
        {
            var credit = await _context.Credits.FindAsync(id);

            if (credit == null)
            {
                return NotFound();
            }

            return credit;
        }

        // PUT: api/Credits/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCredit(int id, Credit credit)
        {
            if (id != credit.PkCredit)
            {
                return BadRequest();
            }

            _context.Entry(credit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreditExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Credits
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Credit>> PostCredit(Credit credit)
        {
            _context.Credits.Add(credit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCredit", new { id = credit.PkCredit }, credit);
        }

        // DELETE: api/Credits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Credit>> DeleteCredit(int id)
        {
            var credit = await _context.Credits.FindAsync(id);
            if (credit == null)
            {
                return NotFound();
            }

            _context.Credits.Remove(credit);
            await _context.SaveChangesAsync();

            return credit;
        }

        private bool CreditExists(int id)
        {
            return _context.Credits.Any(e => e.PkCredit == id);
        }
    }
}
