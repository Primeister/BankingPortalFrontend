import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransactionAccount {
  id: number;
  accountNumber: string;
  accountType: string;
}

export interface BankTransaction {
  id: number;
  amount: number;
  transactionType: string | null;
  direction: string | null;
  timestamp: string;
  account: TransactionAccount;
  relatedAccount: TransactionAccount | null;
}

@Service()
export class Transaction {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/transactions';

  getTransactions(): Observable<BankTransaction[]> {
    return this.http.get<BankTransaction[]>(this.apiUrl);
  }

  transfer(
    sourceAccountId: number,
    destinationAccountNumber: string,
    amount: number
): Observable<void> {

  const params = new HttpParams()
    .set('sourceAccountId', sourceAccountId)
    .set('destinationAccountNumber', destinationAccountNumber)
    .set('amount', amount);

  return this.http.post<void>(
    `${this.apiUrl}/transfer`,
    null,
    { params }
  );
}
}