import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { passwordValidator } from '../../../shared/validators/validator.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
loginForm!: FormGroup;
apiLoader = signal(false);
isPasswordVisible = signal(false);

 constructor(private fb: FormBuilder, private router: Router,private authService:AuthService,private toastr:ToastrService) {
    // Initialized the form in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/)]],
      password: ['', [Validators.required,passwordValidator()]]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }
 /**
   * Logins login component
   */
  login(){
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter required fields');
      return;
    }
  this.apiLoader.set(true);
  this.authService.loginUser(this.loginForm.value).subscribe({
  next:(response:any)=>{
    console.log('res',response)
    this.toastr.success(response.message);
    this.apiLoader.set(false);
    localStorage.setItem('sessionToken', response.data.token);
    this.router.navigate(['/dashboard']);
  },
  error:(error:any)=>{
    console.log('errr',error)
    this.toastr.error(error.message);
    this.apiLoader.set(false);

  }
})
  }
  /**
   * togglepassword visibility
   */
   togglePasswordVisibility() {
  this.isPasswordVisible.set(!this.isPasswordVisible());
}
}
