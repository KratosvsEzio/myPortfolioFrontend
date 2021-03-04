import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as wow from '../../../assets/WOW/wow.min.js';
import * as $ from 'jquery';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public wow = new wow();
  constructor(private router: Router, private userService: UserService) {
    $(document).ready( () => {
      this.wow.init();
    });
  }

  ngOnInit() {
    console.log('Fetch User has been called from Home');
    this.userService.fetchUser();
  }
}
