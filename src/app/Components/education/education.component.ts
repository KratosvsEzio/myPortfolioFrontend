import { Component, OnInit } from '@angular/core';
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
  education: educationData[];
  experience: [];
  items: any;

  constructor( private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      this.education = response.education;
      this.items = response.education;
    });
  }

  tabs(tab: number) {
    this.activeTab = tab;
    this.items = tab === 1 ? this.education : [{date: 'Hello', degree: 'AHAN', institution: 'WOW'}];
    console.log('itmes', this.items);
  }
}
