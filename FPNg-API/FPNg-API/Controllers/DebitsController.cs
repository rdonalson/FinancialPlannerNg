using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FPNg.API.Data.Context;
using FPNg.API.Data.Domain;

namespace FPNg.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DebitsController : ControllerBase
    {
        private readonly FPNgContext _context;

        public DebitsController(FPNgContext context)
        {
            _context = context;
        }

        // GET: api/Debits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Debit>>> GetDebits()
        {
            return await _context.Debits.ToListAsync();
        }

        // GET: api/Debits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Debit>> GetDebit(int id)
        {
            var debit = await _context.Debits.FindAsync(id);

            if (debit == null)
            {
                return NotFound();
            }

            return debit;
        }

        // PUT: api/Debits/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDebit(int id, Debit debit)
        {
            if (id != debit.PkDebit)
            {
                return BadRequest();
            }

            _context.Entry(debit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DebitExists(id))
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

        // POST: api/Debits
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Debit>> PostDebit(Debit debit)
        {
            _context.Debits.Add(debit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDebit", new { id = debit.PkDebit }, debit);
        }

        // DELETE: api/Debits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Debit>> DeleteDebit(int id)
        {
            var debit = await _context.Debits.FindAsync(id);
            if (debit == null)
            {
                return NotFound();
            }

            _context.Debits.Remove(debit);
            await _context.SaveChangesAsync();

            return debit;
        }

        private bool DebitExists(int id)
        {
            return _context.Debits.Any(e => e.PkDebit == id);
        }
    }
}
