import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuth = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  // private loginURL = 'https://gre-api-270614.appspot.com/api/v1/login/';
  // private registerURL = 'https://gre-api-270614.appspot.com/api/v1/register/';

  private loginURL = environment.apiBaseUrl + 'login/';
  private registerURL = environment.apiBaseUrl + 'register/';

  constructor(public http: HttpClient, private router: Router) { }

  loginUser(data: {username: string, password: string}) {
    this.http.post<{token: string}>(this.loginURL, data)
    .subscribe( response => {
      const token = response.token;
      this.token = response.token;
      // const user = response.user;
      // const expiresInDuration = response.expiresIn;
      // this.setAuthTimer(expiresInDuration);
      if (token) {
        this.authStatusListener.next(true);
        this.isAuth = true;
        // const now = new Date();
        // const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
        // console.log(expirationDate);
        this.saveAuthData(token);
        this.router.navigate(['/home']);
      }
    });
  }

  registerUser(data: AuthData): Observable<any> {
    return this.http.post(this.registerURL, data);
  }

  getToken() {
    // console.log(this.getAuthData().token);
    return this.getAuthData().token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Automatically request for new Token if token is going to expire

  // autoAuth() {
  //   const authInformation = this.getAuthData();
  //   if (!authInformation) {
  //     return ;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expiration.getTime() - now.getTime();
  //   console.log(authInformation, expiresIn);
  //   if ( expiresIn > 0 ) {
  //     this.token = authInformation.token;
  //     this.isAuth = true;
  //     // this.setAuthTimer(expiresIn / 1000);
  //     this.authStatusListener.next(true);
  //   }
  // }

  // private setAuthTimer(duration: number) {
  //   console.log('set Timer Duration' , duration);
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000);
  // }

  private saveAuthData(
    token: string,
    // user: any,
    // expirationDate: Date
    ) {
    localStorage.setItem('token', token);
    // this.sessionService.store('token', token);
    // this.sessionService.store('currentUser', user);
    // this.sessionService.store('expiration', expirationDate.toISOString());
    // this.currentUserUpdated.next(user);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    // const expiration = this.sessionService.retrieve('expiration');
    // if ( !token || !expiration) {
    if ( !token || token === undefined) {
      return;
    }
    return {
      token,
      // expiration: new Date( expiration )
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    // this.sessionService.clear('expiration');
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
}
