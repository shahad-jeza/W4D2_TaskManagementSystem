using System.Collections.Generic;
using TaskService.Models;
using TaskModel = TaskService.Models.Task;

namespace TaskService.Data
{
    public class TaskContext
    {
        public List<TaskModel> Tasks { get; set; } = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Finish assigment", Description = "solve and submit the assigmnet 3", Completed = false },
            new TaskModel { Id = 2, Title = "Fix bug", Description = "Find a fix for a bug in project X", Completed = true }
        };
    }
}