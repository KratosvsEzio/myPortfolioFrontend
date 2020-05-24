import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { user } from 'src/app/Models/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutForm: FormGroup;
  user: user;
  // tslint:disable-next-line: variable-name
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.aboutForm = this.formBuilder.group({
      completedProjects: '0',
      workingOn: '0',
      aboutMe: '',
    });

    this._userService.getUser().subscribe( (response: user) => {
      this.user = response;
      console.log(this.user);

      this.aboutForm = this.formBuilder.group({
        completedProjects: [this.user.projects.completedProjects , [Validators.required]],
        workingOn: [this.user.projects.workingOn, [Validators.required]],
        aboutMe: [this.user.aboutMe, [Validators.required]],
      });
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
    this._userService.updateAboutMe(formData)
    .subscribe( (response) => {
      if (response.status) {
        this._userService.fetchUser();
        this._snackBar.open(response.message, 'Dismiss' , {
          duration: 3 * 1000,
        });
      }
    });
  }
}
