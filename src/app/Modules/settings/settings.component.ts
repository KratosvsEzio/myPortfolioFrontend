import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor( private userService: UserService ) { }

  ngOnInit() {
    console.log('Fetch User has been called from Settings');
    this.userService.fetchUser();
  }

}
