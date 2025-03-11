import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { loadTasksSuccess, loadTasksFailure, deleteTaskSuccess, deleteTaskFailure } from '../store/task/task.actions';
import { selectTasks, selectError } from '../store/task/task.selectors';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { TaskFormComponent } from '../task-form/task-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,TaskFormComponent,RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>; // Observable for tasks
  error$: Observable<string | null>; // Observable for errors

  constructor(
    private store: Store,
    private taskService: TaskService,
    private router: Router
  ) {
    // Initialize tasks$ and error$ inside the constructor
    this.tasks$ = this.store.select(selectTasks);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.store.dispatch(loadTasksSuccess({ tasks })),
      error: (error) => this.store.dispatch(loadTasksFailure({ error: error.message })),
    });
  }

  editTask(task: Task) {
    this.router.navigate(['/edit', task.id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.store.dispatch(deleteTaskSuccess({ id })),
      error: (error) => this.store.dispatch(deleteTaskFailure({ error: error.message })),
    });
  }
}