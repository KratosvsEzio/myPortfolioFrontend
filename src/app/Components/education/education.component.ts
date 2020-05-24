import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { educationData } from '../../Models/education.modal';
import { user } from '../../Models/user.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  activeTab = 1;
  items: educationData[];

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUser().subscribe( (response: user) => {
      this.items = response.education;
    });
  }

  tabs(tab: number) {
    this.activeTab = tab;
  }
}
