import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { BreacrumbComponent } from '../../../shared/components/breacrumb/breacrumb.component';
import { BreadcrumbItem } from '../../../shared/interfaces/breadcrumb.interface';
import { generateTaskBreadcrumbs } from '../../../shared/helper/breadcrumb.helper';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [RouterModule,CommonModule,BreacrumbComponent],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewTaskComponent {
  isLoading = signal(false);
  task = signal<any | null>(null);
  errorMessage = signal('');

  taskService = inject(TaskService);
  route = inject(ActivatedRoute);
  taskId = signal<string>('');

protected breadcrumbs = computed<BreadcrumbItem[]>(() =>
  generateTaskBreadcrumbs(this.task()?.id ?? this.taskId, true)
);

 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.taskId.set(id);
    console.log('Task ID:', id);
    this.viewTask();
  }
}
/**
 * Views task
 */
viewTask() {
    this.isLoading.set(true);
    this.taskService.getTaskById(this.taskId()).subscribe({
      next: (res) => {
        console.log('res',res)
        this.task.set(res.data);
        this.isLoading.set(false);
        
      },
      error: (err) => {
        this.errorMessage.set('Failed to load task');
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }
}
