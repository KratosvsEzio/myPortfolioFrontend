import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { user } from '../../Models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  skillSet1: {skill: string}[] = [];
  skillSet2: {skill: string}[] = [];
  aboutMe: string;
  projects: {
    completedProjects: number;
    workingOn: number;
  } = {
    completedProjects: 0,
    workingOn: 0,
  };

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUser().subscribe( (response: user) => {
      this.aboutMe = response.aboutMe;
      this.projects = response.projects;
      for (let i = 0;
          i < response.skillCount
          && this.skillSet1.length <= (response.skillCount / 2)
          && this.skillSet2.length <= (response.skillCount / 2);
          i++) {
        if (i < (response.skillCount / 2) && this.skillSet1.length < (response.skillCount / 2)) {
          this.skillSet1.push(response.skills[i]);
        } else if ( i >= (response.skillCount / 2) && this.skillSet2.length < (response.skillCount / 2)) {
          this.skillSet2.push(response.skills[i]);
        }
      }
    });
  }
}
