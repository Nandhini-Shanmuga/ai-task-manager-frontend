import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import ApexCharts from 'apexcharts';
import { colours, status } from '../../../shared/enums/custom.enum';

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
  }
};

  priorityChart: any;
  priorityLegend: { label: string; color: string }[] = [];
  aiChart:any;
  aiLegend: { label: string; color: string }[] = [];
  statusEnum = status;
  coloursEnum =  colours;

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
      console.log(this.dashboardSummary,'this.dashboardSummary') //debug log
       this.initPriorityChart();
       this.initAiChart();
    },error:(error:any)=>{
      console.error('eror',error)
    }
  });
}

/**
 * Inits priority chart
 */
initPriorityChart() {
  const priorityData = this.dashboardSummary.priorityBreakdown;

  // Define allowed keys
  const allowedKeys = [this.statusEnum.High,this.statusEnum.Medium, this.statusEnum.Low];

  // Filter only required keys
  const filteredLabels = allowedKeys
    .filter(key => priorityData[key] !== undefined)
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const filteredSeries = allowedKeys
    .filter(key => priorityData[key] !== undefined)
    .map(key => priorityData[key]);
  const colors= [colours.High,colours.Medium,colours.Low]

  // Save  data for HTML
  this.priorityLegend = filteredLabels.map((label, index) => ({
    label,
    color: colors[index]
  }));

  const options: any = {
    chart: {
      type: "donut",
      height: 300,
    },
    labels: filteredLabels,
    series: filteredSeries,
    colors: colors,
    legend: {
      show: false 
    },
    dataLabels: {
      enabled: true
    }
  };

  if (this.priorityChart) this.priorityChart.destroy();

  this.priorityChart = new ApexCharts(
    document.querySelector("#priority-chart"),
    options
  );
  
  this.priorityChart.render();
}

/**
 * Inits AI suggestion column chart
 */
initAiChart() {
  // Fix: Access aiSuggestedBreakdown from summary
  const aiData = this.dashboardSummary?.summary?.aiSuggestedBreakdown;

  if (!aiData) {
    console.warn("AI suggested breakdown data not available yet");
    return;
  }

  const allowedKeys = [this.statusEnum.Urgent, this.statusEnum.High,this.statusEnum.Medium, this.statusEnum.Low];

  const filteredLabels = allowedKeys
    .filter(key => aiData[key] !== undefined)
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const filteredSeries = allowedKeys
    .filter(key => aiData[key] !== undefined)
    .map(key => aiData[key]);

  const colors = [this.coloursEnum.Urgent,this.coloursEnum.High, this.coloursEnum.Medium, this.coloursEnum.Low];  

  this.aiLegend = filteredLabels.map((label, index) => ({
    label,
    color: colors[index]
  }));

  const options: any = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: true
    },
    series: [{
      name: 'Tasks',
      data: filteredSeries
    }],
    colors: colors,
    xaxis: {
      categories: filteredLabels
    },
    yaxis: {
      title: {
        text: "Number of Tasks"
      },
      min: 0
    },
    legend: {
      show: false
    }
  };

  if (this.aiChart) this.aiChart.destroy();

  this.aiChart = new ApexCharts(
    document.querySelector("#column-chart"),
    options
  );

  this.aiChart.render();
}


}
