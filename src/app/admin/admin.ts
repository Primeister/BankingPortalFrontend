import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

import {
  AdminService,
  Customer,
  AdminAccount
} from '../services/admin';

import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin',
  imports: [DecimalPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  private adminService = inject(AdminService);
  private auth = inject(Auth);
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);

  customers: Customer[] = [];
  accounts: AdminAccount[] = [];

  isLoading = true;
  errorMessage = '';

  private customersLoaded = false;
  private accountsLoaded = false;

  ngOnInit(): void {
    this.loadCustomers();
    this.loadAccounts();
  }

  loadCustomers(): void {
    this.adminService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.customersLoaded = true;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load customers.';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  loadAccounts(): void {
    this.adminService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.accountsLoaded = true;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load accounts.';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  private checkLoadingComplete(): void {
    if (this.customersLoaded && this.accountsLoaded) {
      this.isLoading = false;
      this.changeDetector.detectChanges();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}