import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { portfolioData } from 'src/app/Models/portfolioData.model';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material';

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
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.portfolioForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this._userService.getUser().subscribe((response) => {
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

  save(id: number, _formGroup: FormGroup) {
    this.isloading = true;
    this.eventCaller = id;
    const newP = _formGroup;
    const p = this.portfolios[id];

    if ( p._id !== '' ) {
      // Call Api for Edit Portfolio
      this._userService.editPortfolio({
        _id: p._id,
        img: newP.controls.img.value,
        name: newP.controls.name.value,
        category: newP.controls.category.value,
        demoURL: newP.controls.demoURL.value,
        gitURL: newP.controls.gitURL.value
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
      // Call Api for New Portfolio
      this._userService.newPortfolio({
        _id: '',
        img: newP.controls.img.value,
        name: newP.controls.name.value,
        category: newP.controls.category.value,
        demoURL: newP.controls.demoURL.value,
        gitURL: newP.controls.gitURL.value
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
    this.isloading = true;
    this.eventCaller = id;
    this._userService.deletePortfolio(this.portfolios[id]._id).subscribe( (response) => {
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
