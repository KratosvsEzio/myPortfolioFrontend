import { Injectable, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser  } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService implements OnInit {

  private loginURL = 'http://127.0.0.1:4000/api/login';

  private user: SocialUser;
  private tokenTimer: any;
  private auth = new BehaviorSubject(false);

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        // console.log(user.idToken);
        this.setTokenId(user.idToken);
        this.authentication();
      }
    });
  }

  ngOnInit() {

  }

  private setTokenId(tokenId: string) {
    sessionStorage.setItem('tokenId', tokenId);
  }

  getTokenId() {
    return sessionStorage.getItem('tokenId');
  }

  authentication() {
    this.http.get<{status: boolean, message: string, expiresIn: number}>(this.loginURL).subscribe( (res) => {
      if (res.status) {
        console.log(res.message);
        this.auth.next(res.status);
        this.auth.subscribe( (res1) => {
          console.log('inside', res1);
        });
        const now = new Date();
        const expirationDate = new Date (now.getTime() + res.expiresIn * 1000);
        this.saveAuth(this.user.authToken, expirationDate);
      }
    });
  }

  getIsAuth(): Observable<boolean> {
    this.auth.subscribe( (res) => {
      console.log('get', res);
    });
    return this.auth;
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

  private setAuthTimer(duration: number) {
    console.log('set Timer Duration' , duration);
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, duration * 1000);
  }

  private saveAuth(token: string, exp: Date) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('exp', exp.toISOString());
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

  private clearAuth() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('exp');
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
