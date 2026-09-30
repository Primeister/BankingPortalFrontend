import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Auth {

  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  login(email: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(
      `${this.apiUrl}/login`,
      null,
      {
        params,
        responseType: 'text'
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload.role || null;

    } catch (error) {
      console.error('Unable to read token:', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}