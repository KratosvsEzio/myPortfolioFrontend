import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { user } from '../../../Models/user.model';
import { experienceData } from '../../../Models/experience.modal';
import { UserService } from '../../../Service/user.service';
import { UserDataService } from '../../../Service/user-data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experienceForm: FormGroup;
  experiences: experienceData[] = [];
  isloading = false;
  eventCaller = -1;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.experienceForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this.userDataService.currentUpdatedUser.subscribe((response: user) => {
      if (response.experience) {
        this.isloading = true;
        this.experiences = [...response.experience];
      }


      // dynamically create inputs
      while (this.listArray.length !== 0) {
        this.listArray.removeAt(0);
      }
      this.experiences.forEach( (ed) => {
        this.listArray.push( this.createItem(ed) );
      });
    });

  }

  createItem(ex: experienceData): FormGroup {
    return this.formBuilder.group({
      date: [ex.date, [Validators.required]],
      designation: [ex.designation, [Validators.required]],
      institution: [ex.institution, [Validators.required]],
      description: [ex.description, [Validators.required]]
    });
  }

  get listArray() { return this.experienceForm.get('listArray') as FormArray; }

  get f() { return this.experienceForm.controls; }

  createExperience() {
    this.listArray.insert(0, this.createItem({_id: '', date: '', designation: 'New Designation', institution: '', description: ''}));
    this.experiences.unshift({_id: '', date: '', designation: 'New Designation', institution: '', description: ''});
  }

  save(id: number, formGroup: FormGroup) {
    // this.isloading = true;
    const newEd = formGroup;
    const ed = this.experiences[id];
    this.eventCaller = id;

    if ( ed._id !== '' ) {
      // Call Api for Edit Education
      this.userService.editExperience({
        _id: ed._id,
        date: newEd.controls.date.value,
        designation: newEd.controls.designation.value,
        institution: newEd.controls.institution.value,
        description: newEd.controls.description.value
      });

    } else {
      // Call Api for New Education
      this.userService.newExperience({
        _id: '',
        date: newEd.controls.date.value,
        designation: newEd.controls.designation.value,
        institution: newEd.controls.institution.value,
        description: newEd.controls.description.value
      });
    }
  }

  delete(id: number) {
    this.eventCaller = id;
    // this.isloading = true;
    this.userService.deleteExperience(this.experiences[id]._id);
  }

}
