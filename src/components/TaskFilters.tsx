import { useTaskContext } from "../hooks/useTaskContext";

interface TaskFiltersProps {
  currentFilter: string;
  currentSearch: string;
}

export function TaskFilters({ currentFilter, currentSearch }: TaskFiltersProps) {
  const { setFilter, setSearch } = useTaskContext();
  return (
    <div>
        <div className="btn-group w-100 mb-4" role="group" aria-label="Task Filters">
          <button
            type="button"
            className={`btn ${currentFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`btn ${currentFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            className={`btn ${currentFilter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
    
        </div>
        <input type="text" className="form-control mb-4" placeholder="Search tasks..." value={currentSearch} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}