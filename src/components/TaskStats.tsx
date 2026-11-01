import {Task} from '../types/task';


interface TaskStatsProps{
    tasks: Task[];
}

export function TaskStats({tasks} : TaskStatsProps){
    return (
        <div className="alert alert-secondary text-center" role="alert">
            <b>Total tasks: {tasks.length}</b> <br></br>
            Tasks completed: {tasks.filter(task => task.completed).length} <br></br>
            Tasks active: {tasks.filter(task => !task.completed).length} <br></br>
        </div>
    )
}