import { useState, FormEventHandler } from 'react';
import { useAppDispatch } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types';
import { addTask } from '../../features/todoSlice';
import './AddTasksForm.scss';

const AddTaskForm = () => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState<string>('');

  const handleAddTask: FormEventHandler = (e) => {
    e.preventDefault();

    if (taskName.trim() !== '') {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        completed: false,
      };
      dispatch(addTask(newTask));
      setTaskName('');
    }
  };

  return (
    <form className="form" onSubmit={handleAddTask}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
