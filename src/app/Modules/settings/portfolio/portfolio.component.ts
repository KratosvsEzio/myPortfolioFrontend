import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { portfolioData } from 'src/app/Models/portfolioData.model';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolioForm: FormGroup;
  portfolios: portfolioData[];
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

    this.portfolioForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this.userDataService.currentUpdatedUser.subscribe((response) => {
      if (response.portfolio) {
        this.isloading = true;
        this.portfolios = [...response.portfolio];
      }


      // dynamically create inputs
      while (this.listArray.length !== 0) {
        this.listArray.removeAt(0);
      }
      this.portfolios.forEach( (p) => {
        this.listArray.push( this.createItem(p) );
      });
    });

  }

  createItem(p: portfolioData): FormGroup {
    return this.formBuilder.group({
      img: [p.img, [Validators.required]],
      name: [p.name, [Validators.required]],
      category: [p.category, [Validators.required]],
      demoURL: [p.demoURL, [Validators.required]],
      gitURL: [p.gitURL, [Validators.required]],
    });
  }

  get listArray() { return this.portfolioForm.get('listArray') as FormArray; }

  get f() { return this.portfolioForm.controls; }

  createPortfolio() {
    this.listArray.insert(0, this.createItem({
      _id: '',
      img: '',
      name: 'New Item',
      category: '',
      demoURL: '',
      gitURL: ''})
    );
    this.portfolios.unshift({
      _id: '',
      img: '',
      name: 'New Item',
      category: '',
      demoURL: '',
      gitURL: ''});
  }

  save(id: number, formGroup: FormGroup) {
    // this.isloading = true;
    this.eventCaller = id;
    const newP = formGroup;
    const p = this.portfolios[id];

    if ( p._id !== '' ) {
      // Call Api for Edit Portfolio
      this.userService.editPortfolio({
        _id: p._id,
        img: newP.controls.img.value,
        name: newP.controls.name.value,
        category: newP.controls.category.value,
        demoURL: newP.controls.demoURL.value,
        gitURL: newP.controls.gitURL.value
      });

    } else {
      // Call Api for New Portfolio
      this.userService.newPortfolio({
        _id: '',
        img: newP.controls.img.value,
        name: newP.controls.name.value,
        category: newP.controls.category.value,
        demoURL: newP.controls.demoURL.value,
        gitURL: newP.controls.gitURL.value
      });
    }
  }

  delete(id: number) {
    // this.isloading = true;
    this.eventCaller = id;
    this.userService.deletePortfolio(this.portfolios[id]._id);
  }

}
