import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AdminAccount {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  customer: Customer;
}

@Service()
export class AdminService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/admin';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${this.apiUrl}/customers`
    );
  }

  getAccounts(): Observable<AdminAccount[]> {
    return this.http.get<AdminAccount[]>(
      `${this.apiUrl}/accounts`
    );
  }
}