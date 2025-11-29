import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const router=inject(Router)
   const authToken = localStorage.getItem("sessionToken");
   if (authToken) {
     req = req.clone({
       headers: req.headers.set('Authorization', `Bearer ${authToken}`),
     });
   }
 
   return next(req).pipe(
     retry(1),
     catchError((error: HttpErrorResponse) => {
       let errorMessage = '';
 
       if (error.error instanceof ErrorEvent) {
         //client side error
         errorMessage = `Error: ${error.error.message}`;         
       }
       else {
         //server side error
         errorMessage = error.error.message;
         // Catch "401 Unauthorized" responses
         if (error.status === 401) {
           localStorage.clear();
           router.navigate(['']);
         }
       }
       return throwError(() => new Error(errorMessage));
     }),
   );
};
