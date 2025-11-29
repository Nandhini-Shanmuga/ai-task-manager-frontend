import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
dashboardSummary = {
  totalTasks: 0,
  completed: 0,
  toDo:0,
  inProgress:0
};
constructor(private taskService: TaskService) {}

ngOnInit(): void {
  this.taskService.getAllTasks().subscribe({
    next: (response: any) => {
      const tasks = response.data;
      this.dashboardSummary = {
        totalTasks: tasks.length,
        toDo: tasks.filter((t:any) => t.status === 'todo').length,
        inProgress: tasks.filter((t:any) => t.status === 'in-progress').length,
        completed: tasks.filter((t:any)=> t.status === 'completed').length,
      };
    },
    error: (err) => console.error(err)
  });
}



}
