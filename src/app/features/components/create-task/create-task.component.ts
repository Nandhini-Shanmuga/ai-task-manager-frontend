import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreacrumbComponent } from '../../../shared/components/breacrumb/breacrumb.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { preventMultipleSpaces,preventSpecialCharacters} from '../../../shared/validators/multi-space-validator'
import { BreadcrumbItem } from '../../../shared/interfaces/breadcrumb.interface';
import { generateTaskBreadcrumbs } from '../../../shared/helper/breadcrumb.helper';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [BreacrumbComponent,CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
  
})
export class CreateTaskComponent implements OnInit{
  protected breadcrumbs = computed(() =>generateTaskBreadcrumbs(this.taskId(), true, this.isUpdate));
  isLoading=signal(false);
  createTaskForm!:FormGroup;
  preventMultipleSpaces = preventMultipleSpaces;
  preventSpecialCharacters = preventSpecialCharacters;
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  minDate!: string;
  route = inject(ActivatedRoute);
  taskId = signal<string>('');
  originalTaskData: any;
  isModified = false;
 isUpdate = !!this.taskId;
  constructor() {}

 ngOnInit() {
  this.minDate = this.getTodayDate();
  this.initForm();

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.taskId.set(id);
    console.log('Task ID:', id);
    this.getSingleTaskDetail();

    // Enable update button only when form values change
    this.createTaskForm.valueChanges.subscribe(() => {
      this.isModified = this.isFormModified();
    });
  }
}

 /**
  * create task form initialization
  */
initForm(){
  this.createTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['', Validators.required],
  });
}
/**
 * Creates task
 * @returns  
 */
createTask(){
    if(this.createTaskForm.invalid){
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }
      this.isLoading.set(true);

    this.taskService.createTask(this.createTaskForm.value).subscribe({
      next:(response:any)=>{
        console.log('task res',response);
        this.createTaskForm.reset();
        this.toastr.success(response.message);
        this.router.navigate(['task']);
        this.isLoading.set(false);
      },
      error:(error:any)=>{
        console.error('error for create task',error);
        this.toastr.error(error?.error?.message || 'Failed to create task');
         this.isLoading.set(false);
      }
    })
  }
  /**
   * Gets single task detail
   */
 getSingleTaskDetail() {
  this.isLoading.set(true);
  this.taskService.getTaskById(this.taskId()).subscribe({
    next: (res: any) => {
      const task = res.data;
     this.originalTaskData = task; // store original values
      this.createTaskForm.patchValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        status: task.status
      });
      this.isLoading.set(false);
    },
    error: (err) => {
      console.error(err);
      this.isLoading.set(false);
      this.toastr.error('Failed to fetch task details');
    }
  });
}
/**
 * Updates task
 * @returns  
 */
updateTask() {
  if (this.createTaskForm.invalid || !this.taskId()) {
    this.toastr.error('Please fill all required fields correctly.');
    return;
  }

  this.isLoading.set(true);
  const taskData = this.createTaskForm.value;

  this.taskService.updateTask(this.taskId(), taskData).subscribe({
    next: (response: any) => {
      this.toastr.success(response.message);
      this.isLoading.set(false);
      this.router.navigate(['task']);
    },
    error: (error: any) => {
      console.error('Error updating task', error);
      this.toastr.error(error?.error?.message);
      this.isLoading.set(false);
    }
  });
}
/**
 * Determines whether form modified is
 * @returns true if form modified 
 */
isFormModified(): boolean {
  if (!this.originalTaskData) return false;

  const { title, description, priority, dueDate, status } = this.createTaskForm.value;
  const originalDueDate = this.originalTaskData.dueDate?.split('T')[0] || '';

  return title !== this.originalTaskData.title ||
         description !== this.originalTaskData.description ||
         priority !== this.originalTaskData.priority ||
         dueDate !== originalDueDate ||
         status !== this.originalTaskData.status;
}

/**
 * Gets today date
 * @returns today date 
 */
getTodayDate(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
/**
 * Redirects task page
 */
redirectTaskPage(){
this.router.navigate(['task'])
  }
}
