import { formatDate, TitleCasePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export interface Task {
  no?: number;
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  aiInsights: {
    suggestedPriority: string;
    reasoning: string;
    estimatedEffort: string;
    recommendations: string[];
    analyzedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskHelper {
  constructor() {}

  /**
   * List tasks in a structured format
   * @param tasksData Raw data from backend
   * @param startingIndex Optional starting index for numbering
   * @returns Array of formatted Task objects
   */
 public listTask(tasksData: any, startingIndex: number) {
  return tasksData.map((task: any, index: number) => ({
    no: startingIndex + index,
    id: task._id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: this.formatDate(task.dueDate),
    createdAt: this.formatDate(task.createdAt),
    updatedAt: this.formatDate(task.updatedAt),
    aiInsights: task.aiInsights
  }));
}




  private formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }
}
