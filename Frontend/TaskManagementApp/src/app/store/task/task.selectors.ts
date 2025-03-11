import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectTasks = createSelector(selectTaskState, (state) => state.tasks);
export const selectError = createSelector(selectTaskState, (state) => state.error);