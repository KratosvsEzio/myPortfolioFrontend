import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Service/user-data.service';
import { user } from 'src/app/Models/user.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillSet1: {skill: string}[] = [];
  skillSet2: {skill: string}[] = [];

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.skillSet1 = [];
    this.skillSet2 = []; 

    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
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
