import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { educationData } from '../../Models/education.modal';
import { user } from '../../Models/user.model';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  activeTab = 1;
  items: educationData[];

  // tslint:disable-next-line: variable-name
  constructor( private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      this.items = response.education;
    });
  }

  tabs(tab: number) {
    this.activeTab = tab;
  }
}
