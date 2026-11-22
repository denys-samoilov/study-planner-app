import { TaskProvider } from './context/TaskContext';

import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthProvider } from './context/AuthContext';
import { PlannerRoutes } from './routes/PlannerRoutes';

function MainContent() {

  return (
      <AppLayout>        

        <div className="container py-5" style={{ maxWidth: '700px' }}>

          <PlannerRoutes/>

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