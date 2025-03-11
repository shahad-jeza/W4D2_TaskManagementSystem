using System.Collections.Generic;
using UserService.Models;

namespace UserService.Data
{
    public class UserContext
    {
        public List<User> Users { get; set; } = new List<User>
        {
            new User { Id = 1, Username = "user1", Email = "user1@example.com" },
            new User { Id = 2, Username = "user2", Email = "user2@example.com" }
        };
    }
}