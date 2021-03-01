using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using FPNG_API.Models;
using System.Security.Claims;
using Microsoft.Identity.Web.Resource;

namespace FPNG_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        // The Web API will only accept tokens 1) for users, and 
        // 2) having the access_as_user scope for this API
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private static readonly string[] scopes = new string[] { "access_as_user", "basic.read", "basic.write" };

        private readonly TodoContext _context;

        public TodoListController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            try
            {
                HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
                HttpContext.VerifyUserHasAnyAcceptedScope("basic.read");

                string owner = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                return await _context.TodoItems.Where(item => item.Owner == owner).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.ToString());
            }
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
           HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            HttpContext.VerifyUserHasAnyAcceptedScope("basic.read");

            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            HttpContext.VerifyUserHasAnyAcceptedScope("basic.write");


            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
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

        // POST: api/TodoItems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            HttpContext.VerifyUserHasAnyAcceptedScope("basic.write");

            string owner = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            todoItem.Owner = owner;
            todoItem.Status = false;

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(int id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            HttpContext.VerifyUserHasAnyAcceptedScope("basic.write");

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
