import { Navigate, Route, Routes } from 'react-router-dom';
import { TasksPage } from '../pages/TasksPage';
import { TaskDetailsPage } from '../pages/TaskDetailsPage';
import { LoginPage } from '../pages/LoginPage';
import type { ReactNode } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { ProfilePage } from '../pages/ProfilePage';


interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth( {children} : RequireAuthProps) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export function PlannerRoutes(){
    return(
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path='/tasks' element={<TasksPage/> }/>
          <Route path='/tasks/:taskId' element={<TaskDetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<RequireAuth><ProfilePage/></RequireAuth>}/>
        </Routes>
    );
}