import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskService } from '../services/task.service';
import { addTaskSuccess, addTaskFailure, updateTaskSuccess, updateTaskFailure } from '../store/task/task.actions';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: Task = { id: 0, title: '', description: '', completed: false };
  isEditMode = false;

  constructor(
    private store: Store,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.fetchTask(+taskId); // Fetch the task to edit
    }
  }

  fetchTask(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task; // Populate the form with the fetched task
      },
      error: (error) => {
        console.error('Failed to fetch task:', error);
      },
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task).subscribe({
        next: (task) => {
          this.store.dispatch(updateTaskSuccess({ task })); // Dispatch updateTaskSuccess
          this.router.navigate(['/']); // Navigate back to the task list
        },
        error: (error) => this.store.dispatch(updateTaskFailure({ error: error.message })),
      });
    } else {
      this.taskService.addTask(this.task).subscribe({
        next: (task) => {
          this.store.dispatch(addTaskSuccess({ task })); // Dispatch addTaskSuccess
          this.router.navigate(['/']); // Navigate back to the task list
        },
        error: (error) => this.store.dispatch(addTaskFailure({ error: error.message })),
      });
    }
  }
}