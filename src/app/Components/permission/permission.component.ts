import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/Service/signin.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  isAuth: boolean;
  tokenId: string;
  constructor(private route: Router, private _signinService: SigninService) { }

  ngOnInit() {

    this._signinService.getIsAuth().pipe(
      tap( res => this.isAuth = res ),
      switchMap( () => this._signinService.tokenIdObservable)
    ).subscribe((tokenId: string) => {
      this.tokenId = tokenId;
      if (this.isAuth === true && this.tokenId && this.tokenId !== '') {
        this.route.navigate(['/profile']);
      }
    });
  }

  onSignIn() {
    this._signinService.signInWithGoogle();
  }
}
