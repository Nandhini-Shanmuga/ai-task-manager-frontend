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
dashboardSummary: any = {
  summary: {
    totalTasks: 0,
    completedTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    dueSoonTasks: 0,
    completionRate: 0
  },
  // priorityBreakdown: {},
  // statusBreakdown: {}
};

constructor(private taskService: TaskService) {}

ngOnInit(): void {
  this.getDashboard();
}
/**
 * Gets dashboard
 */
getDashboard(){
  this.taskService.getDashboardSummary().subscribe({
    next:(response:any)=>{
      this.dashboardSummary = response.data;
    },error:(error:any)=>{
      console.log('eror',error)
    }
  })
}


}
