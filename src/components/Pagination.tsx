import { useTaskContext } from '../hooks/useTaskContext';

export function Pagination() {
  const { page, nextPage, prevPage, tasks } = useTaskContext();

  return (
    <div className="flex items-center justify-between mt-4 px-2 py-3 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page <span className="font-semibold text-gray-900 dark:text-white">{page}</span>
      </span>

      <button
        onClick={nextPage}
        
        disabled={tasks.length < 10}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
}