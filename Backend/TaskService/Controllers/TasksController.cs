using Microsoft.AspNetCore.Mvc;
using TaskService.Data;
using TaskService.Models;
using TaskModel = TaskService.Models.Task;

namespace TaskService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskModel>> GetTasks()
        {
            return Ok(_context.Tasks);
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public ActionResult<TaskModel> GetTask(int id)
        {
            var task = _context.Tasks.Find(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public ActionResult<TaskModel> CreateTask([FromBody] TaskModel task)
        {
            task.Id = _context.Tasks.Max(t => t.Id) + 1;
            _context.Tasks.Add(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, [FromBody] TaskModel task)
        {
            var existingTask = _context.Tasks.Find(t => t.Id == id);
            if (existingTask == null)
            {
                return NotFound();
            }
            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.Completed = task.Completed;
            return NoContent();
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(task);
            return NoContent();
        }
    }
}