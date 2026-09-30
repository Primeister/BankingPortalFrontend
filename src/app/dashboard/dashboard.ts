import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Account, BankAccount } from '../services/account';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private accountService = inject(Account);
  private auth = inject(Auth);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  accounts: BankAccount[] = [];
  errorMessage = '';
  isLoading = true;

  ngOnInit(): void {

    this.accountService.getAccounts().subscribe({

      next: (accounts) => {
        this.accounts = accounts;
        this.isLoading = false;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error(error);

        this.errorMessage = 'Unable to load your accounts.';
        this.isLoading = false;

        this.changeDetector.detectChanges();
      }

    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  viewTransactions(): void {
  this.router.navigate(['/transactions']);
}

viewRecurringPayments(): void {
  this.router.navigate(['/recurring-payments']);
}

viewTransfer(): void {
  this.router.navigate(['/transfer']);
}
}