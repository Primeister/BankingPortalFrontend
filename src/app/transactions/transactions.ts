import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import {Transaction, BankTransaction} from '../services/transaction';

@Component({
  selector: 'app-transactions',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {
  private transactionService = inject(Transaction);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  transactions: BankTransaction[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.isLoading = false;

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);

        this.errorMessage = 'Unable to load your transactions.';
        this.isLoading = false;

        this.changeDetector.detectChanges();
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}