import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(Auth);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  login(): void {

    this.errorMessage = '';
    this.isLoading = true;

    this.auth.login(this.email, this.password).subscribe({

     next: (token) => {

      this.auth.saveToken(token);

      this.isLoading = false;

      if (this.auth.getRole() === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },

      error: (error) => {

        console.error(error);

        this.errorMessage = 'Invalid email or password.';
        this.isLoading = false;

        this.changeDetector.detectChanges();
      }

    });
  }
}