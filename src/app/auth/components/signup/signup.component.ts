import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { nameValidator, passwordMatchValidator } from '../../../shared/validators/validator.constant';
import { initFlowbite } from 'flowbite';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  apiLoader = signal(false);
  isPasswordVisible = signal(false);
  isConfirmPasswordVisible = signal(false);
  emailExists = signal(false);;
  emailMessage = signal('');
  constructor(private fb: FormBuilder, private auth: AuthService,private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    initFlowbite();
    this.setupEmailChecker();
  }
/**
 * Signs up
 */
initForm() {
    this.signupForm = this.fb.group({
        name:['',{ validators: [Validators.required, nameValidator(3, 20)]}],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],},
      { validators: passwordMatchValidator }
    );
  }

 
/**
 * Toggles password visibility
 */
togglePasswordVisibility() {
  this.isPasswordVisible.set(!this.isPasswordVisible());
}
/**
 * Toggles confirm password visibility
 */
toggleConfirmPasswordVisibility() {
  this.isConfirmPasswordVisible.set(!this.isConfirmPasswordVisible());
}

/**
 * Signups submit 
 * @returns  
 */
signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.toastr.error("Please fix the errors in the form");
      return;
    }

    this.apiLoader.set(true);
    const payload = {
    name: this.signupForm.value.name,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password
  };
    this.auth.signupUser(payload).subscribe({
      next: (res: any) => {
        console.log(res,"signup response")
        this.toastr.success(res.message);
        this.apiLoader.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || "Signup failed");
        this.apiLoader.set(false);
      }
    });
  }
/**
 * Setups email checker
 */
setupEmailChecker() {
  this.signupForm.get('email')?.valueChanges.pipe(debounceTime(500),distinctUntilChanged())
    .subscribe(email => {
      this.checkEmailAvailability(email);
    });
}
/**
 * Checks email availability
 * @param email 
 * @returns  
 */
checkEmailAvailability(email: string) {
  if (!email || !email.includes('@')) {
    this.emailExists.set(false);
    this.emailMessage.set('');
    return;
  }

  this.auth.checkEmail(email).subscribe((res: any) => {
    this.emailExists.set(res.exists);
    this.emailMessage.set(res.message); // "Email already exists"
  });
}
}
