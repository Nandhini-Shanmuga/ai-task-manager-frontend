import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
router=inject(Router);
authService=inject(AuthService);
toastr = inject(ToastrService)
logOut(){
  this.authService.logoutUser().subscribe({
    next:(response:any)=>{
      console.log("logout res",response);
      this.toastr.success(response.message);

      // Remove session token
      localStorage.removeItem('sessionToken');

      // Redirect to login
      this.router.navigate(['/']);
    },
    error: () => {
      this.toastr.error('Logout failed');
    }
  })
}
}
