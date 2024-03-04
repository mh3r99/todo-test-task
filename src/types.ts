export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export type Filter = 'all' | 'completed' | 'active';
