import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service.js';
import { user } from '../../../Models/user.model';
import { profileData } from '../../../Models/profile.model';
import { MatSnackBar } from '@angular/material';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { UserDataService } from 'src/app/Service/user-data.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      recentDegree: ['', [Validators.required]],
      githubURL: ['', [Validators.required]],
      cvURL: ['', [Validators.required]],
    });

    // this.userService.fetchUser();

    this.userDataService.currentUpdatedUser.pipe(distinctUntilChanged()).subscribe( (response: user) => {
      // console.log('inside profile settings get user', response);
      this.profile = {...response.profile};
      this.previewImage = response.profile.image;

      this.f.name.setValue(this.profile.name);
      this.f.email.setValue(this.profile.email);
      this.f.address.setValue(this.profile.address);
      this.f.specialization.setValue(this.profile.specialization);
      this.f.recentDegree.setValue(this.profile.recentDegree);
      this.f.githubURL.setValue(this.profile.githubURL);
      this.f.cvURL.setValue(this.profile.cvURL);
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
    this.userService.updateProfile(formData);
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
    this.userService.updateUserImage(img);
  }

}
