import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

// import custom validator to validate that password and confirm password fields match
import { passValidator } from '../../Shared/custom-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { console.log('signin component Created'); }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: ['', passValidator]
    });
    console.log('signinForm Created');
  }

  get f() { return this.signupForm.controls; }

  submit() {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = {
      email: this.f.email.value,
      username: this.f.userName.value,
      password: this.f.password.value,
      confirm_password: this.f.password.value,
    };

    console.log(formData);

    this.authService.registerUser(formData).subscribe( res => {
      console.log(res);
    });
  }

}
