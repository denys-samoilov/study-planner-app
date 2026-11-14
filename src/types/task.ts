export type Priority = 'low' | 'medium' | 'high';

export class Task {
  id: number; 
  title: string;       
  description: string; 
  completed: boolean;  
  priority: Priority;  
  category: string;    
  isDeleting: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    completed: boolean,
    priority: Priority,
    category: string,
    isDeleting: boolean = false) 
    {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.isDeleting = isDeleting;
  }
}