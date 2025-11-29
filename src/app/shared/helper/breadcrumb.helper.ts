import { BreadcrumbItem } from "../interfaces/breadcrumb.interface";

/**
 * Generates task breadcrumbs
 * @param [taskId] 
 * @returns task breadcrumbs 
 */
export function generateTaskBreadcrumbs(taskId?: string,includeThirdBreadcrumb = true,isUpdate = false): BreadcrumbItem[] {
 const taskIcon=`<svg class="w-5 h-5 me-2 sm:me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
          </svg>`
  const breadcrumbs: BreadcrumbItem[] = [
 
 {
      label: 'Task Management',
      path: null,
      icon: `<svg class="w-5 h-5 me-2 sm:me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" clip-rule="evenodd"/>
          </svg>`,
    },
    {
      label: 'Task List',
      path: '/task',
      icon: `<svg class="w-5 h-5 me-2 sm:me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
          </svg>`,
    },
 ];
 if (includeThirdBreadcrumb) {
   if (taskId && isUpdate) {
    breadcrumbs.push(
     {
         label: 'Update Task',
          path:  `/task/edit/${taskId}`,
          icon: taskIcon,
     });
    }
  else if (taskId) {
    breadcrumbs.push(
    
         {
             label: 'View Task',
      path:  `/task/view/${taskId}`,
            icon: `<svg class="w-5 h-5 me-2 sm:me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
          </svg>`,
     });
    }
  else{
    breadcrumbs.push(
            {
             label: 'Create Task',
            path: '/task/create',
            icon: taskIcon,
          
        });
    }
}
 
  return breadcrumbs;
    }