import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { SigninService } from './signin.service';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate {
  constructor(private signinService: SigninService, private router: Router) { }

  isAuth = new BehaviorSubject<boolean>(false);
  isAuthObservable: Observable<boolean> = this.isAuth.asObservable();

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
  boolean | Observable<boolean> | Promise<boolean> {

    this.signinService.getIsAuth().subscribe( (isAuth: boolean) => {
      if (!isAuth) {
        // Link at which it should be redirected to if auth failed
        this.router.navigate(['/profile/alijinnah19']);
      }
    });
    return this.signinService.getIsAuth();
    // return true;
  }
}
