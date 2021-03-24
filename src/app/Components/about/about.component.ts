import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private userDataService: UserDataService) {
  }

  aboutMe: string;

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( response => this.aboutMe = response.aboutMe);
  }
}
