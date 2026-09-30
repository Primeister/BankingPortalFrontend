import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';


import {Account, BankAccount} from '../services/account';

import { Transaction } from '../services/transaction';

@Component({
  selector: 'app-transfer',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class Transfer {

  private accountService = inject(Account);
  private transactionService = inject(Transaction);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  accounts: BankAccount[] = [];

  sourceAccountId: number | null = null;
  destinationAccountNumber = '';
  amount: number | null = null;

  isLoading = true;
  isTransferring = false;

  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;

        if (accounts.length > 0) {
          this.sourceAccountId = accounts[0].id;
        }

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

  transfer(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.sourceAccountId === null || !this.destinationAccountNumber || !this.amount
) {
  this.errorMessage = 'Please complete all fields.';
  return;
}

    

  this.isTransferring = true;
  this.transactionService.transfer(
  this.sourceAccountId,
  this.destinationAccountNumber,
  this.amount
).subscribe({
      next: () => {
        this.isTransferring = false;
        this.successMessage = 'Transfer completed successfully.';

        this.amount = null;
        this.destinationAccountNumber = '';
        // Reload accounts so the updated balances are displayed.
        this.loadAccounts();

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);

        this.isTransferring = false;

        if (error.error?.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'Unable to complete the transfer.';
        }

        this.changeDetector.detectChanges();
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}