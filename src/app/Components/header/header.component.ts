import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import * as Headroom from '../../../assets/vendor/headroom/headroom.min.js';
import { SigninService } from 'src/app/Service/signin.service.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private header: any;
  isAuth: boolean;

  // tslint:disable-next-line: variable-name
  constructor(private _signinService: SigninService) { }

  ngOnInit() {
    this._signinService.getIsAuth().subscribe((response) => {
      this.isAuth = response;
    });
    $(document).ready( () => {
      this.header = new Headroom(document.querySelector('header'), {
        tolerance:  {
            up: 0,
            down: 0
        },
        offset : 120,
        classes: {
            initial: 'header--fixed',
            pinned: 'slideDown',
            unpinned: 'slideUp',
            top: 'top',
            notTop : 'not-top',
        }
      });

      // Initialize headroom object.
      this.header.init();

      // When the page is at the top, remove the slideDown class.
      window.addEventListener('scroll', () => {
        if (window.pageYOffset === 0 ) {
            $('header').removeClass('slideDown');
        }
      });
    });
  }

  onSignOut() {
    this._signinService.signOut();
  }

  ngOnDestroy() {
    $(document).ready( () => {
      if (this.header) {
        this.header.destroy();
      }
    });
  }
}

