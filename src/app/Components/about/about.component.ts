import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { user } from '../../Models/user.model';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  skillSet1: {skill: string}[] = [];
  skillSet2: {skill: string}[] = [];
  aboutMe: string;
  projects: { completedProjects: number; workingOn: number } = {
    completedProjects: 0,
    workingOn: 0,
  };

  // tslint:disable-next-line: variable-name
  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      this.aboutMe = response.aboutMe;
      this.projects = response.projects;
      // for (let i = 0; this.loopCondition(i, response); i++) {
      //   if (i < (response.skillCount / 2) && this.skillSet1.length < (response.skillCount / 2)) {
      //     this.skillSet1.push(response.skills[i]);
      //   } else if ( i >= (response.skillCount / 2) && this.skillSet2.length < (response.skillCount / 2)) {
      //     this.skillSet2.push(response.skills[i]);
      //   }
      // }
      for (let i = 0; i < response.skillCount; i++) {
        if (i%2 === 0) {
          this.skillSet1.push(response.skills[i]);
        } else {
          this.skillSet2.push(response.skills[i]);
        }
      }
    });
  }

  loopCondition(i: number, response) {
    return i < response.skillCount && this.skillSet1.length <= (response.skillCount / 2)
    && this.skillSet2.length <= (response.skillCount / 2);
  }
}
