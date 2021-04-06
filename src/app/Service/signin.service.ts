import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser  } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { shareReplay, take, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private environmentApiBaseUrl = environment.apiBaseUrl;
  private loginURL = this.environmentApiBaseUrl + '/api/login';

  private user: SocialUser;
  private tokenTimer: any;

  private auth = new BehaviorSubject<boolean>(true);
  authObservable: Observable<boolean> = this.auth.asObservable();

  private tokenId = new BehaviorSubject<string>('');
  tokenIdObservable: Observable<string> = this.tokenId.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.tokenId.subscribe( tokenId => {
      if(tokenId !== '') {
        this.autoAuth() ? this.auth.next(true) : this.authentication(tokenId);
      }
    })
  }

  // ---------------------------------------set OAuth Token in local storage from google api---------------------//
  setOAuthToken() {
    this.authService.authState.pipe(
      shareReplay(),
    )
    .subscribe((user) => {
      if (user) {
        // this.user = user;
        // console.log(user.idToken);
        this.tokenId.next(user.idToken);
        // this.setTokenId(user.idToken);
        // this.authentication();
      }
    });
  }

  // ---------------------------------------get is auth---------------------------------------------------------//
  getIsAuth(): Observable<boolean> {
    return this.authObservable.pipe( shareReplay() );
  }

  // ---------------------------------------sign in With Google-------------------------------------------------//
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // ---------------------------------------Authenticate when we login-------------------------------------------//
  authentication(tokenId) {
    this.http.post<{token: string, message: string, expiresIn: number}>(this.loginURL, {tokenId}).pipe(
      shareReplay()
    )
    .subscribe( (res) => {
      if (res.token) {
        console.log('response', res);
        this.updateMessage(res);
        this.auth.next(true);
        this.saveAuth(res.token, res.expiresIn.toString());
      } else {
        this.updateMessage(res);
        this.auth.next(false);
        this.clearAuth();
      }
    });
  }

  // ---------------------------------------Show message once we login in----------------------------------------//
  updateMessage(response) {
    if (response.status) {
      this.snackBar.open(response.message, 'Dismiss' , {
        duration: 3 * 1000,
      });
    }
  }

  // ---------------------------------------save token and expiry time in local storage--------------------------//
  private saveAuth(token: string, exp: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp);
  }

  // ---------------------------------------Auo Auth ------------------------------------------------------------//
  autoAuth() {
    const authInformation = this.getAuth();
    if (!authInformation) {
      return false;
    }

    // console.log('auto Auth', authInformation);
    const expiresIn = authInformation.exp - (new Date().getTime()/1000) ;
    // console.log(authInformation.exp, (new Date().getTime()/1000), expiresIn);
    if ( authInformation.token && expiresIn > 0 ) {
      this.auth.next(true);
      this.setAuthTimer(expiresIn);
      return true;
    }

    return false;
  }

  // ---------------------------------------get token and expiry time---------------------------------------------//
  getAuth() {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    if ( !token || !exp) {
      return;
    }
    return {
      token,
      exp: +exp
    };
  }

  // ---------------------------------------set token expiry timer-----------------------------------------------//
  private setAuthTimer(duration: number) {
    console.log('set Timer Duration' , duration);
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, duration * 1000);
  }

  // ---------------------------------------Remove Token And Expiry Time from Local Storage----------------------//
  private clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  // ---------------------------------------Sign out Function----------------------------------------------------//
  signOut(): void {
    this.auth.next(false);
    this.clearAuth();
    clearTimeout(this.tokenTimer);
    this.authService.signOut().then(() => {
      this.router.navigate(['/profile']);
      console.log('You have Successfully Signed Out');
    })
    .catch( (err) => {
      console.log(err);
    });
  }
}
