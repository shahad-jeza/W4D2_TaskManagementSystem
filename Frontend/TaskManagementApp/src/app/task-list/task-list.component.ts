import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { loadTasksSuccess, loadTasksFailure, deleteTaskSuccess, deleteTaskFailure } from '../store/task/task.actions';
import { selectTasks, selectError } from '../store/task/task.selectors';
import { Task } from '../models/task.model';
import { Observable, combineLatest, map } from 'rxjs';
import { TaskFormComponent } from '../task-form/task-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,TaskFormComponent,RouterModule,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>; // Observable for tasks
  error$: Observable<string | null>; // Observable for errors
  filteredTasks$: Observable<Task[]>; // Observable for filtered and sorted tasks

  // Filter and sort properties
  statusFilter: string = 'all';
  sortBy: string = 'title';

  constructor(
    private store: Store,
    private taskService: TaskService,
    private router: Router
  ) {
    // Initialize tasks$ and error$ inside the constructor
    this.tasks$ = this.store.select(selectTasks);
    this.error$ = this.store.select(selectError);

    // Combine tasks with filter and sort logic
    this.filteredTasks$ = combineLatest([this.tasks$]).pipe(
      map(([tasks]) => {
        // Create a new array to avoid mutating the original state
        let filteredTasks = [...tasks];

        // Filter by status
        if (this.statusFilter === 'completed') {
          filteredTasks = filteredTasks.filter((task) => task.completed);
        } else if (this.statusFilter === 'pending') {
          filteredTasks = filteredTasks.filter((task) => !task.completed);
        }

        // Sort by title
        if (this.sortBy === 'title') {
          filteredTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
        }

        return filteredTasks;
      })
    );
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

  applyFilters() {
    // Re-trigger the filteredTasks$ observable
    this.filteredTasks$ = combineLatest([this.tasks$]).pipe(
      map(([tasks]) => {
        // Create a new array to avoid mutating the original state
        let filteredTasks = [...tasks];

        // Filter by status
        if (this.statusFilter === 'completed') {
          filteredTasks = filteredTasks.filter((task) => task.completed);
        } else if (this.statusFilter === 'pending') {
          filteredTasks = filteredTasks.filter((task) => !task.completed);
        }

        // Sort by title
        if (this.sortBy === 'title') {
          filteredTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
        }

        return filteredTasks;
      })
    );
  }
}