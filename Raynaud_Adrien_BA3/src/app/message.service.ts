// success-error-message.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuccessErrorMessageService {
  private successMessageSubject = new BehaviorSubject<string | null>(null);
  successMessage$ = this.successMessageSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  setSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
