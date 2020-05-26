import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as wow from '../../../assets/WOW/wow.min.js';
import * as $ from 'jquery';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public wow = new wow();
  // tslint:disable-next-line: variable-name
  constructor(private router: Router, private userService: UserService) {
    // this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe(() => {
      $(document).ready( () => {
        this.wow.init();
      });
    // });
  }

  ngOnInit() {
    console.log('Fetch User has been called from Home');
    this.userService.fetchUser();
  }
}
