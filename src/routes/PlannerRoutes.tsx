import { Navigate, Route, Routes } from 'react-router-dom';
import { TasksPage } from '../pages/TasksPage';
import { TaskDetailsPage } from '../pages/TaskDetailsPage';
import { LoginPage } from '../pages/LoginPage';


export function PlannerRoutes(){
    return(
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path='/tasks' element={<TasksPage/>}/>
          <Route path='/tasks/:taskId' element={<TaskDetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    );
}