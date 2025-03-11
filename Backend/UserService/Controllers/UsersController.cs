using Microsoft.AspNetCore.Mvc;
using UserService.Data;
using UserService.Models;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_context.Users);
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _context.Users.Find(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] User user)
        {
            user.Id = _context.Users.Max(u => u.Id) + 1;
            _context.Users.Add(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, [FromBody] User user)
        {
            var existingUser = _context.Users.Find(u => u.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.Username = user.Username;
            existingUser.Email = user.Email;
            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            return NoContent();
        }
    }
}