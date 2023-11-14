// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {
//   emailControl = new FormControl('', [Validators.required, Validators.email]);
//   passwordControl = new FormControl('', [Validators.required]);
//   confirmPasswordControl = new FormControl('', [Validators.required]);

//   registerForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required]),
//     confirmPassword: new FormControl('', [Validators.required]),
//   });

//   get passwordMismatch(): boolean {
//     const password = this.registerForm.get('password')?.value;
//     const confirmPassword = this.registerForm.get('confirmPassword')?.value;
//     return password !== confirmPassword;
//   }

//   constructor(private authService: AuthService, private router: Router) {}

//   register(): void {
//     if (this.registerForm.invalid) {
//       this.registerForm.markAllAsTouched();
//     } else {
//         const registrationData = {
//             email: 'example@email.com',
//             password: 'yourpassword',
//             confirmPassword: 'yourpassword',
//           };

//       // Ensure passwords match
//       if (registrationData.password !== registrationData.confirmPassword) {
//         // Handle password mismatch (e.g., display an error message)
//         console.error('Passwords do not match');
//         return;
//       }

//       // Call AuthService register method
//       this.authService.register(registrationData).subscribe({
//         next: () => {
//           // Registration successful, navigate to login or dashboard
//           this.router.navigate(['/login']);
//         },
//         error: (err) => {
//             console.error('Registration failed:', err);
//             // Handle registration error (e.g., display an error message)
//             Swal.fire({
//               icon: 'error',
//               title: 'Registration Error',
//               text: 'An error occurred during registration. Please try again.',
//             });
//         }
        
//       });
//     }
//   }
// }