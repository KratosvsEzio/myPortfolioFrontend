import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser  } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { shareReplay, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private environmentApiBaseUrl = environment.apiBaseUrl;
  private loginURL = this.environmentApiBaseUrl + '/api/login';

  private user: SocialUser;
  private tokenTimer: any;
  private auth = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  getIsAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // console.log('signin with google');
    this.setOAuthToken();
  }

  setOAuthToken() {
    this.authService.authState.pipe(
      shareReplay(),
      take(1)
    )
    .subscribe((user) => {
      if (user) {
        this.user = user;
        // console.log(user.idToken);
        this.setTokenId(user.idToken);
        this.authentication();
      }
    });
  }

  authentication() {
    this.http.get<{status: boolean, message: string, expiresIn: number}>(this.loginURL).pipe(
      shareReplay()
    )
    .subscribe( (res) => {
      if (res.status) {
        console.log(res.message);
        this.auth.next(res.status);
        const expirationDate = new Date (new Date().getTime() + res.expiresIn * 1000);
        this.saveAuth(this.user.authToken, expirationDate);
      }
    });
  }

  private saveAuth(token: string, exp: Date) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('exp', exp.toISOString());
  }

  autoAuth() {
    const authInformation = this.getAuth();
    if (!authInformation) {
      return ;
    }
    console.log(authInformation);
    const expiresIn = (authInformation.exp.getTime()) - (new Date().getTime()) ;
    console.log(authInformation, expiresIn);
    if ( expiresIn > 0 ) {
      this.auth.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private getAuth() {
    const token = sessionStorage.getItem('token');
    const exp = sessionStorage.getItem('exp');
    if ( !token || !exp) {
      return;
    }
    return {
      token,
      exp: new Date( exp )
    };
  }

  private setAuthTimer(duration: number) {
    console.log('set Timer Duration' , duration);
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, duration * 1000);
  }

  private setTokenId(tokenId: string) {
    sessionStorage.setItem('tokenId', tokenId);
  }

  getTokenId() {
    return sessionStorage.getItem('tokenId');
  }

  private clearAuth() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('exp');
  }

  signOut(): void {
    sessionStorage.removeItem('tokenId');
    this.auth.next(false);
    this.clearAuth();
    clearTimeout(this.tokenTimer);
    this.authService.signOut()
    .then(() => {
      this.router.navigate(['/profile/alijinnah19']);
      console.log('You have Successfully Signed Out');
    })
    .catch( (err) => {
      console.log(err);
    });
  }
}
