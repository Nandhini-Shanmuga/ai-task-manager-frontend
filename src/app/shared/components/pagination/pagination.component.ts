import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() advertisingList: EventEmitter<any> = new EventEmitter();
  @Output() startingIndex: EventEmitter<number> = new EventEmitter();
  @Input() totalPages: number = 0;
  @Input() totalDocs: number = 0;
  @Input() apiUrl: string = '';
  @Input() firstIndex: number = 0;
  @Input() search: string = '';
 @Input() filters: any = {}; 
 @Input() searchTerm: string = '';
  constructor(private taskService: TaskService) { }
  

  /**
   * Gets pagination list
   * @returns  
   */
    public getPaginationList() {
      let apiCall$: any;
      switch (this.apiUrl) {
        case 'task':
          const params = {
          page: this.currentPage,
          limit: this.limit,
          ...this.filters 
        };
        // Add search if exists
       if (this.searchTerm && this.searchTerm.trim()) {
        params.search = this.searchTerm.trim();
      }
        // Add filters if exist
        if (this.filters && Object.keys(this.filters).length > 0) {
          Object.keys(this.filters).forEach(key => {
            if (this.filters[key]) {
              params[key] = this.filters[key];
            }
          });
        }
        console.log('params',params)
          apiCall$ = this.taskService.getAllTasks(params);
          break;
    
        default:
          console.error('Invalid API type');
          return;
      }

      apiCall$.subscribe({
        next: (res: any) => {
        this.totalItems = res.data.totalDocs;
          this.totalPages = res.data.totalPages;
          this.totalDocs = res.data.totalDocs;
          this.firstIndex = res.data.pagingCounter;
          this.startingIndex.emit(this.firstIndex);
          this.advertisingList.emit(res.data.docs);
      },
        error: (err: any) => {
          console.log(err);
        },
      });
    }

  /**
    * Changes page
    * @param page
    */
  changePage(page: number): void {
    console.log('page',page);
    
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }

  /**
   * Go to previous page
   */
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginationList();
    }
  }

  /**
   * Go to next page
   */
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginationList();
    }
  }

  /**
   * Go to page
   * @param pageNumber 
   */
  goToPage(pageNumber: any): void {
    if (pageNumber && pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getPaginationList();
    }
  }

  /**
   * Gets page numbers
   */
  get pageNumbers(): (number | string)[] {
    const totalPagesToShow = 3; // Number of pages to show in pagination
    const currentPageIndex = this.currentPage - 1;

    if (this.totalPages <= totalPagesToShow) {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    } else {
      const halfPagesToShow = Math.floor(totalPagesToShow / 2);
      let startPage: number;
      let endPage: number;

      if (currentPageIndex <= halfPagesToShow) {
        startPage = 1;
        endPage = totalPagesToShow;
      } else if (currentPageIndex + halfPagesToShow >= this.totalPages) {
        startPage = this.totalPages - totalPagesToShow + 1;
        endPage = this.totalPages;
      } else {
        startPage = currentPageIndex - halfPagesToShow + 1;
        endPage = currentPageIndex + halfPagesToShow;
      }

      let pages: (number | string)[] = Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
        if (startPage > 1) {
        pages = [1, '...', ...pages];
      }
        if (endPage < this.totalPages) {
        pages = [...pages, '...', this.totalPages];
      }

      return pages;
    }
  }

  /**
   * @param{number}firstIndex
   * @param{number}totalItems
   * @param{number}itemsPerPage
   */
  calculateLastIndex(firstIndex: number, totalDocs: number, itemsPerPage: number): number {
    const lastIndex = firstIndex + itemsPerPage - 1;
    return Math.min(lastIndex, totalDocs);
  }


  /**
   * Calculates starting index based on current page and limit
   * @returns starting index 
   */
  calculateStartingIndex(): number {
    return (this.currentPage - 1) * this.limit + 1;
  }


}
