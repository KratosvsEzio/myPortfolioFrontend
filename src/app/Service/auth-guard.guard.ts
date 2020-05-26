import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninService } from './signin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate {
  constructor(private signinService: SigninService, private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
  boolean | Observable<boolean> | Promise<boolean> {
    let isAuth: boolean;

    this.signinService.getIsAuth().subscribe( (response: boolean) => {
      isAuth = response;
      console.log('inside auth Guard', response);

      if (!isAuth) {
        // Link at which it should be redirected to if auth failed
        this.router.navigate(['/profile/alijinnah19']);
      }
    });
    return isAuth;
  }
}
