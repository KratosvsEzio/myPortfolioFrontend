import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { educationData } from '../../../Models/education.modal';
import { UserService } from '../../../Service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationForm: FormGroup;
  educations: educationData[];
  isloading = false;
  eventCaller = -1;
  // tslint:disable-next-line: variable-name
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.educationForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this._userService.getUser().subscribe((response) => {
      if (response.portfolio) {
        this.isloading = true;
        this.educations = [...response.education];
      }


      // dynamically create inputs
      while (this.listArray.length !== 0) {
        this.listArray.removeAt(0);
      }
      this.educations.forEach( (ed) => {
        this.listArray.push( this.createItem(ed) );
      });
    });

  }

  createItem(ed: educationData): FormGroup {
    return this.formBuilder.group({
      date: [ed.date, [Validators.required]],
      degree: [ed.degree, [Validators.required]],
      institution: [ed.institution, [Validators.required]]
    });
  }

  get listArray() { return this.educationForm.get('listArray') as FormArray; }

  get f() { return this.educationForm.controls; }

  createEducation() {
    this.listArray.insert(0, this.createItem({_id: '', date: '', degree: 'New Degree', institution: ''}));
    this.educations.unshift({_id: '', date: '', degree: 'New Degree', institution: ''});
  }

  save(id: number, _formGroup: FormGroup) {
    this.isloading = true;
    const newEd = _formGroup;
    const ed = this.educations[id];
    this.eventCaller = id;

    if ( ed._id !== '' ) {
      // Call Api for Edit Education
      this._userService.editEducation({
        _id: ed._id,
        date: newEd.controls.date.value,
        degree: newEd.controls.degree.value,
        institution: newEd.controls.institution.value
      }).subscribe( (response) => {
        this.isloading = false;
        if (response.status) {
          this._userService.fetchUser();
          this._snackBar.open(response.message, 'Dismiss' , {
            duration: 3 * 1000,
          });
        }
      });

    } else {
      // Call Api for New Education
      this._userService.newEducation({
        _id: '',
        date: newEd.controls.date.value,
        degree: newEd.controls.degree.value,
        institution: newEd.controls.institution.value
      }).subscribe( (response) => {
        this.isloading = false;
        if (response.status) {
          this._userService.fetchUser();
          this._snackBar.open(response.message, 'Dismiss' , {
            duration: 3 * 1000,
          });
        }
      });
    }
  }

  delete(id: number) {
    this.eventCaller = id;
    this.isloading = true;
    this._userService.deleteEducation(this.educations[id]._id).subscribe( (response) => {
      if (response.status) {
        this.isloading = false;
        this._userService.fetchUser();
        this._snackBar.open(response.message, 'Dismiss' , {
          duration: 3 * 1000,
        });
      }
    });
  }

}
