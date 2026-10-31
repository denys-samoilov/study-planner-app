import type { Task } from "../types/task";

class TaskFiltersProps{
    tasks: Task[];

    constructor(tasks: Task[]){
        this.tasks = tasks;
    }
}

export function TaskFilters({ tasks }: TaskFiltersProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return(<h2></h2>)
}
