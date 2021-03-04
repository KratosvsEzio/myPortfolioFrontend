import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import * as Headroom from '../../../assets/vendor/headroom/headroom.min.js';
import { SigninService } from 'src/app/Service/signin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private header: any;
  isAuthObservable: Observable<boolean>;
  isAuth: boolean = false;

  constructor(
    private signinService: SigninService,
  ) { }

  ngOnInit() {
    this.isAuthObservable = this.signinService.getIsAuth();

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
    this.signinService.signOut();
  }

  ngOnDestroy() {
    $(document).ready( () => {
      if (this.header) {
        this.header.destroy();
      }
    });
  }
}


