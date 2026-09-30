import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecurringPayment {
  id: number;
  amount: number;
  beneficiary: string;
  frequency: string;
  nextPaymentDate: string;
  active: boolean;
  account: {
    id: number;
    accountNumber: string;
    accountType: string;
  };
}

@Service()
export class RecurringPaymentService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/recurring-payments';

  getPayments(): Observable<RecurringPayment[]> {
    return this.http.get<RecurringPayment[]>(this.apiUrl);
  }

  createPayment(
    payment: RecurringPayment,
    accountId: number
  ): Observable<RecurringPayment> {

    const params = new HttpParams()
      .set('accountId', accountId);

    return this.http.post<RecurringPayment>(
      this.apiUrl,
      payment,
      { params }
    );
  }

  cancelPayment(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}