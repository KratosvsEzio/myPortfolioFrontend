import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { educationData } from '../../../Models/education.modal';
import { UserService } from '../../../Service/user.service';
import { MatSnackBar } from '@angular/material';
import { UserDataService } from 'src/app/Service/user-data.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.educationForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this.userDataService.currentUpdatedUser.subscribe((response) => {
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

  save(id: number, formGroup: FormGroup) {
    // this.isloading = true;
    const newEd = formGroup;
    const ed = this.educations[id];
    this.eventCaller = id;

    if ( ed._id !== '' ) {
      // Call Api for Edit Education
      this.userService.editEducation({
        _id: ed._id,
        date: newEd.controls.date.value,
        degree: newEd.controls.degree.value,
        institution: newEd.controls.institution.value
      });

    } else {
      // Call Api for New Education
      this.userService.newEducation({
        _id: '',
        date: newEd.controls.date.value,
        degree: newEd.controls.degree.value,
        institution: newEd.controls.institution.value
      });
    }
  }

  delete(id: number) {
    this.eventCaller = id;
    // this.isloading = true;
    this.userService.deleteEducation(this.educations[id]._id);
  }

}
