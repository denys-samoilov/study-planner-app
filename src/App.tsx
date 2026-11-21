import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { TaskEditModal } from './components/TaskEditModal';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './hooks/useTaskContext';
import { Toast } from './components/Toast';
import { Pagination } from './components/Pagination';
import { TaskDetailModal } from './components/TaskDetailModal';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { TasksPage } from './pages/TasksPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';

function MainContent() {

  return (
      <AppLayout>        

        <div className="container py-5" style={{ maxWidth: '700px' }}>

          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path='/tasks' element={<TasksPage/>}/>
            <Route path='/tasks/:taskId' element={<TaskDetailsPage/>}/>

          </Routes>

          {/* <TaskForm />

          <TaskStats tasks={tasks} />

          <TaskFilters 
            currentFilter={filter}
            currentSearch={search}
          />

          
          <Pagination/>

          <TaskEditModal 
            isOpen={editingTask !== null}
          />

          <TaskDetailModal
            isOpen={viewingTask !== null}
          /> */}

          {/* <Toast
            isOpen={toast !== null}
            message={toast?.message || ''}
            type={toast?.type}
            duration={toast?.duration}
            onUndo={deletingTask !== undefined ? undoDelete : undefined}
          /> */}

        </div>
      </AppLayout>

  );
}

export function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <MainContent />
      </TaskProvider>
    </BrowserRouter>

  );
}

export default App;