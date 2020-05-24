import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('',
      [
        Validators.required,
        // Validators.minLength(6)
      ]
      ),
    });
  }

  get f() { return this.signinForm.controls; }

  submit() {
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = {
      username: this.f.userName.value,
      password: this.f.password.value
    };

    console.log(formData);
    this.authService.loginUser(formData);
  }
}
