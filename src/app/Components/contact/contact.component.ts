import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from '../../Service/send-email.service';
import { contactForm } from '../../Models/contactFrom.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _sendEmailService: SendEmailService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {

    // return if form is not valid.
    if (!this.contactForm.valid) {
      return;
    }

    const formData: contactForm = {
      name: this.f.name.value,
      email: this.f.email.value,
      subject: this.f.subject.value,
      message: this.f.message.value,
    };

    // send form data to service
    this._sendEmailService.sendEmail(formData).subscribe( (response) => {
      if (response.status) {
        this._snackBar.open(response.message, 'Dismiss' , {
          duration: 3 * 1000,
        });
      }
    });
  }

}
