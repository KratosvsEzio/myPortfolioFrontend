import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SigninService } from 'src/app/Service/signin.service';
import { filter } from 'rxjs/operators';
import * as wow from '../../../assets/WOW/wow.min.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public wow = new wow();
  // tslint:disable-next-line: variable-name
  constructor(private router: Router, private _signinService: SigninService) {
    this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe(() => {
      $(document).ready( () => {
        this.wow.init();
      });
    });
  }

  flag: boolean;
  ngOnInit() {

    // this._signinService.ngOnInit();

    // console.log('before', this.flag);
    // this.router.events
    // .pipe( filter(e => e instanceof NavigationEnd) )
    // .subscribe((navEnd: NavigationEnd) => {
    //   // console.log(navEnd.urlAfterRedirects);
    //   if (navEnd.urlAfterRedirects !== '/profile/alijinnah19') {
    //     this._signinService.getIsAuth().subscribe((response) => {
    //       if (!response) {
    //         this.flag = !response;
    //       } else {
    //         this.flag = response;
    //       }
    //     });
    //     console.log('!==', this.flag);
    //   } else {
    //     this._signinService.getIsAuth().subscribe((response) => {
    //       this.flag = response;
    //     });
    //     console.log('===', this.flag);
    //   }
    // });
  }
}
