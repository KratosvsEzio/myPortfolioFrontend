import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/Service/signin.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  isAuth: boolean;

  // tslint:disable-next-line: variable-name
  constructor(private route: Router, private _signinService: SigninService) { }

  ngOnInit() {

    this._signinService.getIsAuth().subscribe((response: boolean) => {
      this.isAuth = response;
      console.log(response);
      if (this.isAuth === true) {
        this.route.navigate(['/profile']);
      }
    });
  }

  onSignIn() {
    this._signinService.signInWithGoogle();
  }
}
