import { useState, FC } from 'react';
import type { Task } from '../../types';
import { useAppDispatch } from '../../store';
import { deleteTask, editTask, moveTask, toggleTask } from '../../features/todoSlice';
import './TaskItem.scss';

interface ITaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: FC<ITaskItemProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const { id, name, completed } = task;

  const [isEdit, setIsEdit] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState<string>('');
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [droppableIndex, setDroppableIndex] = useState<number | null>(null);

  const handleToggleTask = (id: string) => {
    dispatch(toggleTask(id));
  };

  const onDeleteTask = () => {
    dispatch(deleteTask(id));
  };

  const onEditTask = () => {
    setIsEdit(true);
    setEditedTaskName(name);
  };

  const onCancelEditTask = () => {
    setIsEdit(false);
    setEditedTaskName('');
  };

  const onSaveEditedTask = () => {
    if (editedTaskName.trim() !== '') {
      dispatch(
        editTask({
          id,
          name: editedTaskName,
        }),
      );
      setIsEdit(false);
      setEditedTaskName('');
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('id', id);
    setDraggingId(id);
  };

  const onDrop = (e: React.DragEvent<HTMLLIElement>) => {
    const id = e.dataTransfer.getData('id');
    dispatch(moveTask({ id, newIndex: index }));
  };

  const onDragEnd = () => {
    setDraggingId(null);
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDroppableIndex(index);
  };

  const onDragLeave = () => {
    setDroppableIndex(null);
  };

  return (
    <li
      key={task.id}
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      className={
        'taskItem' +
        (draggingId === id ? ' dragging' : '') +
        (droppableIndex === index ? ' droppable' : '')
      }>
      <input type="checkbox" checked={completed} onChange={() => handleToggleTask(id)} />
      {isEdit ? (
        <input
          type="text"
          value={editedTaskName}
          onChange={(e) => setEditedTaskName(e.target.value)}
          placeholder="Edit task name"
        />
      ) : (
        <span className={task.completed ? 'completed' : ''}>{name}</span>
      )}
      <div className="actions">
        {isEdit ? (
          <>
            <button className="save" onClick={onSaveEditedTask}>
              Save
            </button>
            <button onClick={onCancelEditTask}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit" onClick={onEditTask}>
              Edit
            </button>
            <button onClick={onDeleteTask}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
