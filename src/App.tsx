import { useMemo } from 'react';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskItem from './components/TaskItem/TaskItem';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';

function App() {
  const { tasks, filter } = useSelector((state: RootState) => state.todos);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === 'completed') {
          return task.completed;
        } else if (filter === 'active') {
          return !task.completed;
        }
        return true;
      }),
    [tasks, filter],
  );

  return (
    <div className="container">
      <h1>Todo List</h1>
      <AddTaskForm />
      <TaskFilter filter={filter} />
      <ul>
        {filteredTasks.map((task, index) => (
          <TaskItem key={task.id} index={index} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default App;
