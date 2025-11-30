import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, ViewChild } from '@angular/core';
import { BreacrumbComponent } from '../../../shared/components/breacrumb/breacrumb.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { BreadcrumbItem } from '../../../shared/interfaces/breadcrumb.interface';
import { generateTaskBreadcrumbs } from '../../../shared/helper/breadcrumb.helper';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ICreateTaskTableHeader } from './interface/task.interface';
import { createTaskTableHeader } from './store/task.item';
import { TaskManagerTableComponent } from '../../../shared/components/task-manager-table/task-manager-table.component';
import { TaskHelper } from './helper/task.helper';
import { ToastrService } from 'ngx-toastr';
import { DeletePopUpComponent } from '../../../shared/components/delete-pop-up/delete-pop-up.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,BreacrumbComponent,FormsModule,ReactiveFormsModule,TaskManagerTableComponent,DeletePopUpComponent,FilterComponent,PaginationComponent],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskListComponent implements OnInit {
  search = new FormControl('');
  currentSearchTerm: string = '';
  tableHeader: ICreateTaskTableHeader[] = createTaskTableHeader;
  isDeleteLoading=signal(false)
  currentTaskId: string | null = null;
  currentTaskTitle: string | null = null;
  isDeleteModalVisible = false;
  protected router = inject(Router)
  protected breadcrumbs = computed<BreadcrumbItem[]>(() => generateTaskBreadcrumbs('', false));
  private taskService = inject(TaskService);
  private taskHelper=inject(TaskHelper);
  private toastr = inject(ToastrService);
  taskData: any[] = [];     
  filteredTasks: any[] = [];  // Displayed filter tasks
  currentFilters: any = {};  
  isFilterOpen = false;
  searchData: any[] = [];
  protected limit: number = 10;
  protected totalItems: number = 0;
  protected totalPages: number = 0;
  protected pageNumbers: number = 0;
  protected startingIndex: number = 0;
  protected apiUrl: string = "task";
  protected currentPage = 1;
  protected previous: boolean = false;
  protected next: boolean = false;
  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;
  
  constructor(){}
  ngOnInit(){
    this.getAllTask();
   this.setupSearchListener();
  }
  /**
 * Navigates to create task page
 */
onCreateTask(){
this.router.navigate(['task/create'])
}
/**
 * Gets all task
 */
getAllTask(){
    const params = {
    page: this.currentPage,
    limit: this.limit,
    ...this.currentFilters 
  };
  this.taskService.getAllTasks(params).subscribe({
    next:(response:any)=>{
    this.taskData = response.data.docs;
    this.startingIndex = response.data.pagingCounter;   
    this.taskData = this.taskHelper.listTask(this.taskData,this.startingIndex);
    this.next = response.data.hasNextPage;
    this.totalPages = response.data.totalPages;
    this.totalItems = response.data.totalDocs;   
    },
    error:(err:any)=>{
      console.log('error in get all task',err)
    }
  })
}
/**
 * Edits task
 * @param event 
 */
editTask(event:any){
    this.router.navigate([`/task/edit/${event.id}`]);
  }
 
  /**
   * Views task
   * @param event 
   */
  viewTask(event: any) {
  console.log('view event', event);
  this.router.navigate(['task/view', event.id]);
}
 /**
 * Opens delete modal
 * @param event 
 */
openDeleteModal(event: { id: string; title: string }) {
  console.log('event',event)
    this.currentTaskId = event.id;
    this.currentTaskTitle = event.title;
    this.isDeleteModalVisible = true;
  }

/**
 * Closes delete modal
 */
closeDeleteModal() {
  this.isDeleteModalVisible = false;
  this.currentTaskTitle = null;
}

/**
 * Handles delete
 */
handleDelete() {
  if (!this.currentTaskId) return; 

  this.deleteTask(this.currentTaskId); 
  this.closeDeleteModal();
}

  /**
   * Deletes owner
   * @param id 
   */
  deleteTask(id:string){
    this.isDeleteLoading.set(true);
    this.taskService.deleteTask(id).subscribe({
      next:(response:any)=>{
        this.isDeleteLoading.set(false);
        this.toastr.success(response.message);
        this.getAllTask();
      },error:(error:any)=>{
        console.error(error);
        this.isDeleteLoading.set(false);

      }
    })
  }


 /**
  * Filters tasks
  * @returns  
  */

onFilter(filters: any) {
  this.isFilterOpen = false;
  this.currentFilters = { ...filters };
 
  // Trigger pagination refresh
    if (this.paginationComponent) {
       this.paginationComponent.searchTerm = this.currentSearchTerm;
      this.paginationComponent.currentPage = 1; // Reset to first page
      this.paginationComponent.filters = this.currentFilters;
      this.paginationComponent.getPaginationList();
    }
    
}



/**
 * Searchs tasks
 * @returns  
 */
searchTasks(searchTerm: string | null) {
  this.currentSearchTerm = searchTerm?.trim() || '';
  console.log('Search term:', this.currentSearchTerm);
  
  if (this.paginationComponent) {
    // THIS IS THE KEY LINE - You must set searchTerm on pagination component
    this.paginationComponent.searchTerm = this.currentSearchTerm;
    this.paginationComponent.currentPage = 1;
    
    // Debug log
    console.log('Set pagination searchTerm to:', this.paginationComponent.searchTerm);
    
    this.paginationComponent.getPaginationList();
}
}
/**
 * Setups search listener
 */
private setupSearchListener() {
  this.search.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  ).subscribe(searchTerm => {
    this.searchTasks(searchTerm);
  });
}
/**
 * Lists task item component
 * @param list 
 */
public list(list: any) {
  this.taskData = list;
  this.taskData = this.taskHelper.listTask(this.taskData, this.startingIndex);
  
}

/**
 * Sets starting index
 * @param index 
 */
setStartingIndex(index: any) {
  this.startingIndex = index;  
}
/**
 * Determines whether page change on
 * @param page 
 */
public onPageChange(page: any) {
  this.currentPage = page;
  this.getAllTask()
}

}
