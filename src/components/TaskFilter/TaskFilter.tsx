import { FC, ChangeEvent } from 'react';
import type { Filter } from '../../types';
import { useAppDispatch } from '../../store';
import { setFilter } from '../../features/todoSlice';
import './TaskFilter.scss';

interface ITaskFilterProps {
  filter: Filter;
}

const TaskFilter: FC<ITaskFilterProps> = ({ filter }) => {
  const dispatch = useAppDispatch();

  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value as Filter));
  };

  return (
    <select className="select" value={filter} onChange={onFilterChange}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  );
};

export default TaskFilter;
