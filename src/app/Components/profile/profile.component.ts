import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service.js';
import { user } from '../../Models/user.model';
import { profileData } from '../../Models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  projects: {completedProjects: number; workingOn: number} = { completedProjects: 0, workingOn: 0};
  profile: profileData = {
    name: '',
    image: '../../../assets/images/defaultUser.jpg',
    address: '',
    email: '',
    specialization: '',
    recentDegree: '',
    githubURL: '',
    cvURL: ''
  };

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._userService.getUser().subscribe( (response: user) => {
      this.projects = response.projects;
      this.profile = response.profile;
    });
  }
}
