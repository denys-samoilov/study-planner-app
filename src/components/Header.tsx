//import { useTaskContext } from "../hooks/useTaskContext";

export function Header() {
    //const { clearCompleted, resetTasks } = useTaskContext();


    return(
        <header className="d-flex justify-content-between align-items-center mb-4 text-center">
            <h1 className="fw-bold mb-0">StudyPlanner</h1>

            {/* <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={resetTasks}
              >
                Reset Data
              </button>
            </div> */}
        </header>
    )
}
