import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
       * Passwords validator
       * @returns validator 
       */
      export function passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const password = control.value || '';
      
          const errors: ValidationErrors = {};
      
          if (password && password.length < 8) {
            errors['length'] = 'Minimum 8 characters required';
          }
          if (password && !/[a-z]/.test(password)) {
            errors['lowercase'] = 'At least one lowercase letter is required';
          }
          if (password && !/[A-Z]/.test(password)) {
            errors['uppercase'] = 'At least one uppercase letter is required';
          }
          if (password && !/\d/.test(password)) {
            errors['number'] = 'At least one number is required';
          }
          if (password && !/[$!%*?&@_]/.test(password)) {
            errors['special'] = 'At least one special character is required';
          }
      
          return Object.keys(errors).length ? errors : null;
        };
      }
/**
 * password match validator
 * @param control 
 * @returns 
 */
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}
 /**
     * Names validator
     * @param minLength 
     * @param maxLength 
     * @returns validator 
     */
  export function nameValidator(minLength: number, maxLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          // Check if value is a string and not empty
          if (typeof value !== 'string' || value.trim() === '') {
              return { invalidName: true };
          }
          // Regular expression to check for only letters and spaces
          const isValid = /^[A-Za-z\s]+$/.test(value);
          const isLengthValid = value.length >= minLength && value.length <= maxLength;
          // Return error if invalid or length is not valid
          if (!isValid) {
            return { pattern: true };
          }
      
          if (!isLengthValid) {
            return { length: { min: minLength, max: maxLength } };
          }
          // Return null if valid
          return null;
      };
      }
      