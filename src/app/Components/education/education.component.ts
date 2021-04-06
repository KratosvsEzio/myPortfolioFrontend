import { Component, OnInit } from '@angular/core';
import { educationData } from '../../Models/education.modal';
import { user } from '../../Models/user.model';
import { UserDataService } from '../../Service/user-data.service';
import { experienceData } from '../../Models/experience.modal';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  activeTab = 1;
  education: educationData[];
  experience: experienceData[] = [
    {_id: '', date: 'Hello', designation: 'AHAN', institution: 'WOW', description: 'hoho'},
  ];
  items: any;

  constructor( private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      this.education = response.education;
      this.experience = response.experience || [
        {_id: '', date: 'Hello', designation: 'AHAN', institution: 'WOW', description: 'hoho'},
      ];
      this.items = response.education;
    });
  }

  tabs(tab: number) {
    this.activeTab = tab;
    this.items = tab === 1 ? this.education : this.experience;
    console.log('itmes', this.items);
  }
}
