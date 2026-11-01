export type FilterType = 'all' | 'completed' | 'active';

interface TaskFiltersProps {
  currentFilter: FilterType;
  changeFilter: (filter: FilterType) => void;
}

export function TaskFilters({ currentFilter, changeFilter }: TaskFiltersProps) {
  return (
    <div className="btn-group w-100 mb-4" role="group" aria-label="Task Filters">
      <button
        type="button"
        className={`btn ${currentFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeFilter('all')}
      >
        All
      </button>
      <button
        type="button"
        className={`btn ${currentFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeFilter('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        className={`btn ${currentFilter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeFilter('active')}
      >
        Active
      </button>
    </div>
  );
}