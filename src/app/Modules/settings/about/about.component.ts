import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { user } from 'src/app/Models/user.model';
import { MatSnackBar } from '@angular/material';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutForm: FormGroup;
  projects: {completedProjects: number, workingOn: number};
  aboutMe: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.aboutForm = this.formBuilder.group({
      completedProjects: ['0', [Validators.required]],
      workingOn: ['0', [Validators.required]],
      aboutMe: ['', [Validators.required]],
    });

    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      this.projects = response.projects;
      this.aboutMe = response.aboutMe;
      // console.log(this.user);

      this.f.completedProjects.setValue(this.projects.completedProjects);
      this.f.workingOn.setValue(this.projects.workingOn);
      this.f.aboutMe.setValue(this.aboutMe);
    });
  }

  get f() {
    return this.aboutForm.controls;
  }

  onSubmit() {

    // return if form is not valid.
    if (!this.aboutForm.valid) {
      return;
    }

    const formData = {
      completedProjects: this.f.completedProjects.value,
      workingOn: this.f.workingOn.value,
      aboutMe: this.f.aboutMe.value,
    };

    // send form data to service
    this.userService.updateAboutMe(formData);
  }
}
