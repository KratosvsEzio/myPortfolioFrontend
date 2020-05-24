import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('interceptor', authToken);
    let authRequest = req;
    if (req.url !== 'https://gre-api-270614.appspot.com/api/v1/login/' &&
    req.url !== 'https://gre-api-270614.appspot.com/api/v1/register/') {
      const authToken = this.authService.getToken();
      authRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
    }
    return next.handle(authRequest);
  }

}

