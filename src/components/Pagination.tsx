import { useTaskContext } from '../hooks/useTaskContext';

export function Pagination() {
  const { page, nextPage, prevPage, totalTasksOnStart } = useTaskContext();

  return (
    <nav aria-label="Task navigation" className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center px-2">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="btn btn-outline-secondary btn-sm px-3"
      >
        Previous
      </button>

      <span className="text-muted small">
        Page <span className="fw-bold text-body">{page}</span>
      </span>

      <button
        onClick={nextPage}
        disabled={totalTasksOnStart < 10}
        className="btn btn-outline-secondary btn-sm px-3"
      >
        Next
      </button>
    </nav>
  );
}