using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksDetailsController : ControllerBase
    {
        private readonly TasksContext _context;

        public TasksDetailsController(TasksContext context)
        {
            _context = context;
        }

        // GET: api/TasksDetails
        [HttpGet]
        public IEnumerable<TasksDetails> Getlist()
        {
            return _context.list;
        }

        // GET: api/TasksDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTasksDetails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tasksDetails = await _context.list.FindAsync(id);

            if (tasksDetails == null)
            {
                return NotFound();
            }

            return Ok(tasksDetails);
        }

        // PUT: api/TasksDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTasksDetails([FromRoute] int id, [FromBody] TasksDetails tasksDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tasksDetails.id)
            {
                return BadRequest();
            }

            _context.Entry(tasksDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksDetailsExists(id))
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

        // POST: api/TasksDetails
        [HttpPost]
        public async Task<IActionResult> PostTasksDetails([FromBody] TasksDetails tasksDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.list.Add(tasksDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTasksDetails", new { id = tasksDetails.id }, tasksDetails);
        }

        // DELETE: api/TasksDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasksDetails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tasksDetails = await _context.list.FindAsync(id);
            if (tasksDetails == null)
            {
                return NotFound();
            }

            _context.list.Remove(tasksDetails);
            await _context.SaveChangesAsync();

            return Ok(tasksDetails);
        }

        private bool TasksDetailsExists(int id)
        {
            return _context.list.Any(e => e.id == id);
        }
    }
}