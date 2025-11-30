import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
 {
    path: '',loadComponent: () =>import('./auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'sign-up',loadComponent: () =>import('./auth/components/signup/signup.component').then(m=>m.SignupComponent)
  },

  {path:'dashboard',canActivate:[authGuard],
    loadComponent:()=>import('../app/features/components/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
    {path:'task',
      canActivate:[authGuard],
        children:[
            {path:'',loadComponent:()=>import('./features/components/task-list/task-list.component').then(m=>m.TaskListComponent)},
            {path: 'create',loadComponent: () =>import('./features/components/create-task/create-task.component').then((m) => m.CreateTaskComponent)},
            {path: 'edit/:id', loadComponent: () => import('./features/components/create-task/create-task.component').then((m) => m.CreateTaskComponent)},
           {path:'view/:id',loadComponent:() =>import('./features/components/view-task/view-task.component').then(m=>m.ViewTaskComponent) },

        ],

     },

]