import { useState } from 'react';
import { Task } from './types/task';
import { TaskList } from './components/TaskList';
import { initialTasks } from './data/initialTasks';

export function App() {

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <header className="text-center mb-4">
        <h1 className="fw-bold">TaskManager</h1>
      </header>

      <TaskList
        tasks={initialTasks}
        
      />
    </div>
  );
}

export default App;
