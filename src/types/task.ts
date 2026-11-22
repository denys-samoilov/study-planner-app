export type Priority = 'low' | 'medium' | 'high';

export class Task {
  id: number; 
  title: string;       
  description: string; 
  completed: boolean;  
  priority: Priority;  
  category: string;    
  isDeleting: boolean;
  createdBy: string | undefined;
  createdAt: string;

  constructor(
    id: number,
    title: string,
    description: string,
    completed: boolean,
    priority: Priority,
    category: string,
    isDeleting: boolean = false,
    createdBy: string | undefined,
    createdAt: string) 
    {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.isDeleting = isDeleting;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}