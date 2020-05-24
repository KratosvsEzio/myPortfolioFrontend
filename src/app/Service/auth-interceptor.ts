import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SigninService } from './signin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authToken = null;
  constructor(private signinService: SigninService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.signinService.getTokenId()) {
      this.authToken = this.signinService.getTokenId();
    }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authToken)
    });
    return next.handle(authRequest);
  }
}
