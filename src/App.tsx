import { TaskProvider } from './context/TaskContext';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthProvider } from './context/AuthContext';
import { PlannerRoutes } from './routes/PlannerRoutes';

function MainContent() {

  return (
      <AppLayout>        

        <div className="container py-5" style={{ maxWidth: '700px' }}>

          <PlannerRoutes/>

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
      <AuthProvider>
        <TaskProvider>
          <MainContent />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;