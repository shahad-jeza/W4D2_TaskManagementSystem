namespace TaskService.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string? Title { get; set; } // Mark as nullable
        public string? Description { get; set; } // Mark as nullable
        public bool Completed { get; set; } = false; // Initialize with a default value
    }
}