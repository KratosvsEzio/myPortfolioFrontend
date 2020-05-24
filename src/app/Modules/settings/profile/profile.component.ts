import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service.js';
import { user } from '../../../Models/user.model';
import { profileData } from '../../../Models/profile.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile: profileData = {
    name: '',
    image: '../../../../assets/images/defaultUser.jpg',
    address: '',
    email: '',
    specialization: '',
    recentDegree: '',
    githubURL: '',
    cvURL: ''
  };
  previewImage: string | ArrayBuffer = '../../../../assets/images/defaultUser.jpg';

  // tslint:disable-next-line: variable-name
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: '',
      email: '',
      address: '',
      specialization: '',
      recentDegree: '',
      githubURL: '',
      cvURL: '',
    });

    this._userService.getUser().subscribe( (response: user) => {
      this.profile = response.profile;
      this.previewImage = response.profile.image;

      this.profileForm = this.formBuilder.group({
        name: [this.profile.name, [Validators.required]],
        email: [this.profile.email, [Validators.required]],
        address: [this.profile.address, [Validators.required]],
        specialization: [this.profile.specialization, [Validators.required]],
        recentDegree: [this.profile.recentDegree, [Validators.required]],
        githubURL: [this.profile.githubURL, [Validators.required]],
        cvURL: [this.profile.cvURL, [Validators.required]],
      });
    });
  }

  // Form Control Getter
  get f() {
    return this.profileForm.controls;
  }

  // On Submit Form Action
  onSubmit() {

    // return if form is not valid.
    if (!this.profileForm.valid) {
      return;
    }

    const formData: profileData = {
      name: this.f.name.value,
      image: this.profile.image,
      email: this.f.email.value,
      address: this.f.address.value,
      specialization: this.f.specialization.value,
      recentDegree: this.f.recentDegree.value,
      githubURL: this.f.githubURL.value,
      cvURL: this.f.cvURL.value,
    };

    // send form data to service
    this._userService.updateProfile(formData)
    .subscribe( (response) => {
      if (response.status) {
        this._userService.fetchUser();
        this._snackBar.open(response.message, 'Dismiss' , {
          duration: 3 * 1000,
        });
      }
    });
  }

  // change profile image
  onImagePick(event: Event) {
    if ((event.target as HTMLInputElement).files.length === 0) {
      return;
    }
    // show image preview
    const reader = new FileReader();
    const img = (event.target as HTMLInputElement).files[0];
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(img);

    // upload image
    this._userService.updateUserImage(img)
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
