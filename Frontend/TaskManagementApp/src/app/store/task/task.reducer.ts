import { createReducer, on } from '@ngrx/store';
import { TaskState, initialState } from './task.state';
import * as TaskActions from './task.actions';

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)), // Replace the old task with the updated task
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
  on(TaskActions.loadTasksFailure, TaskActions.addTaskFailure, TaskActions.updateTaskFailure, TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);