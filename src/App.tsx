import { useState } from 'react';
import { Task } from './types/task';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { initialTasks } from './data/initialTasks';

export function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleAddTask(newTask: Task): void {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <header className="text-center mb-4">
        <h1 className="fw-bold">StudyPlanner</h1>
      </header>

      <TaskForm onAddTask={handleAddTask} />

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;