import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private http = inject(HttpClient);


  constructor() { }
 /**
  * Gets all tasks
  */
getAllTasks(page?:number,limit?:number): Observable<any> {
  const parms=!page && !limit ? '' :`?page=${page || ''}&limit=${limit || ''}`

  return this.http.get(`${environment.API_BASE_URL}tasks${parms}`);
}

/**
 * Creates task
 * @param params 
 */
createTask(params: any): Observable<any> {
  return this.http.post(`${environment.API_BASE_URL}tasks/create`, params);
}
/** Get a single task by ID */
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}tasks/${id}`);
  }

  /** Update a task by ID */
  updateTask(id: string, params: any): Observable<any> {
    return this.http.put(`${environment.API_BASE_URL}tasks/update/${id}`, params);
  }

  /** Delete a task by ID */
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${environment.API_BASE_URL}tasks/delete/${id}`);
  }

  /** Get AI insights for a task */
  getAIInsights(id: string): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}tasks/${id}/ai-insights`);
  }
/**
 * Gets dashboard summary
 * @returns  
 */
getDashboardSummary() {
  return this.http.get(`${environment.API_BASE_URL}analytics/dashboard`);
}
}
