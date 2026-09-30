import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  RecurringPaymentService,
  RecurringPayment
} from '../services/recurring-payment';

import {
  Account,
  BankAccount
} from '../services/account';

@Component({
  selector: 'app-recurring-payments',
  imports: [FormsModule, DecimalPipe, DatePipe],
  templateUrl: './recurring-payments.html',
  styleUrl: './recurring-payments.css'
})
export class RecurringPayments {

  private recurringPaymentService = inject(RecurringPaymentService);
  private accountService = inject(Account);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  payments: RecurringPayment[] = [];
  accounts: BankAccount[] = [];

  selectedAccountId: number | null = null;
  beneficiary = '';
  amount: number | null = null;
  frequency = 'MONTHLY';
  nextPaymentDate = '';

  isLoading = true;
  isCreating = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadPayments();
    this.loadAccounts();
  }

  loadPayments(): void {
    this.recurringPaymentService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load your recurring payments.';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;

        if (accounts.length > 0) {
          this.selectedAccountId = accounts[0].id;
        }

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createPayment(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      this.selectedAccountId === null ||
      !this.beneficiary ||
      !this.amount ||
      !this.nextPaymentDate
    ) {
      this.errorMessage = 'Please complete all fields.';
      return;
    }

    const payment = {
      amount: this.amount,
      beneficiary: this.beneficiary,
      frequency: this.frequency,
      nextPaymentDate: this.nextPaymentDate,
      active: true
    } as RecurringPayment;

    this.isCreating = true;

    this.recurringPaymentService
      .createPayment(payment, this.selectedAccountId)
      .subscribe({
        next: () => {
          this.isCreating = false;
          this.successMessage = 'Recurring payment created successfully.';

          this.beneficiary = '';
          this.amount = null;
          this.frequency = 'MONTHLY';
          this.nextPaymentDate = '';

          this.loadPayments();
          this.changeDetector.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.isCreating = false;
          this.errorMessage = 'Unable to create the recurring payment.';
          this.changeDetector.detectChanges();
        }
      });
  }

  cancelPayment(id: number): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.recurringPaymentService.cancelPayment(id).subscribe({
      next: () => {
        this.successMessage = 'Recurring payment cancelled.';
        this.loadPayments();
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to cancel the recurring payment.';
        this.changeDetector.detectChanges();
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}