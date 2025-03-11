import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};