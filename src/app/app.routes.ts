import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Transactions } from './transactions/transactions';
import { RecurringPayments } from './recurring-payments/recurring-payments';
import { authGuard } from './guards/auth-guard';
import { Transfer } from './transfer/transfer';
import { Admin } from './admin/admin';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    component: Transactions,
    canActivate: [authGuard]
  },
  {
    path: 'recurring-payments',
    component: RecurringPayments,
    canActivate: [authGuard]
  },
  {
    path: 'transfer',
    component: Transfer,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard]
 }
];