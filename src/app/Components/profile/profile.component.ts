import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { profileData } from '../../Models/profile.model';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  projects: {completedProjects: number; workingOn: number};
  profile: profileData;

  constructor( private userDataService: UserDataService) {}

  ngOnInit() {
    // this.userService.fetchUser()
    this.userDataService.currentUpdatedUser.subscribe( (response) => {
      // console.log('Inside Profile Page Get User', response);
      this.projects = response.projects;
      this.profile = response.profile;
    });
  }
}
