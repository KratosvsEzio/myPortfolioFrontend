import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Service/user-data.service';
import { user } from 'src/app/Models/user.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: { completedProjects: number; workingOn: number } = {
    completedProjects: 0,
    workingOn: 0,
  };

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.currentUpdatedUser.subscribe( response => this.projects = response.projects);
  }

}
