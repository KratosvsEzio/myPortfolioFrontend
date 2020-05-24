import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contactForm } from '../Models/contactFrom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private emailURL = 'http://127.0.0.1:4000/api/sendEmail';

  constructor(private http: HttpClient) { }

  sendEmail(formData: contactForm): Observable<{message: string, status: boolean}> {
    return this.http.post<{status: boolean, message: string}>(this.emailURL, formData);
  }
}
