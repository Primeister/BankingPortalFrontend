import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccount {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
}

@Service()
export class Account {

  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/accounts';

  getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.apiUrl);
  }
}