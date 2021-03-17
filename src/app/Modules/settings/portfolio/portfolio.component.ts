import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { portfolioData } from 'src/app/Models/portfolioData.model';
import { UserService } from 'src/app/Service/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UserDataService } from 'src/app/Service/user-data.service';
import { ProjectDialogComponent } from 'src/app/Components/project-dialog/project-dialog.component';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Description {
  frontend: {
    name: string,
    url: string,
    icon: string
  }[],
  backend: {
    name: string,
    url: string,
    icon: string
  }[],
  framework: {
    name: string,
    url: string,
    icon: string
  }[],
  library: {
    name: string,
    url: string,
    icon: string
  }[],
  database: {
    name: string,
    url: string,
    icon: string
  }[],
  font: {
    name: string,
    url: string,
    icon: string
  }[],
  icon: {
    name: string,
    url: string,
    icon: string
  }[],
};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userDataService: UserDataService,
    private dialog: MatDialog
  ) { }

  portfolioForm: FormGroup;
  portfolios: portfolioData[];
  isloading = false;
  eventCaller = -1;


  get f() { return this.portfolioForm.controls; }
  get listArray() { return this.f.listArray as FormArray; }


  // --------------------------Mat chip Properties---------------------------------------------//
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  description: Description[] | any =  [];

  remove(i: number, data: any, key: string): void {
    // console.log('remove new item', this.description, this.description[key], data, key, i);
    this.description[i][key] = this.description[i][key].filter(item => item.name !== data.name );
  }

  ngOnInit() {

    this.portfolioForm = this.formBuilder.group({
      listArray: this.formBuilder.array([])
    });

    this.userDataService.currentUpdatedUser.subscribe((response) => {
      if (response.portfolio) {
        this.description = [];
        this.isloading = true;
        this.portfolios = [...response.portfolio];
      }


      // dynamically create inputs
      while (this.listArray.length !== 0) {
        this.listArray.removeAt(0);
      }

      this.portfolios.forEach( (p, i) => {
        this.listArray.push( this.createItem(p) );
        this.description.push({
          frontend: [],
          backend: [],
          framework: [],
          library: [],
          database: [],
          font: [],
          icon: []
        });

        // console.log('description defore = ', this.description)

        p.description.frontend ? p.description.frontend.forEach(element => this.addNewItem(i, 'frontend', element)) : '';
        p.description.backend ? p.description.backend.forEach(element => this.addNewItem(i, 'backend', element)) : '';
        p.description.framework ? p.description.framework.forEach(element => this.addNewItem(i, 'framework', element)) : '';
        p.description.library ? p.description.library.forEach(element => this.addNewItem(i, 'library', element)) : '';
        p.description.database ? p.description.database.forEach(element => this.addNewItem(i, 'database', element)) : '';
        p.description.font ? p.description.font.forEach(element => this.addNewItem(i, 'font', element)) : '';
        p.description.icon ? p.description.icon.forEach(element => this.addNewItem(i, 'icon', element)) : '';

        // console.log('description after = ', this.description);
      });
    });
  }


  // --------------------------Create Forms---------------------------------------------//
  createItem(p: any): FormGroup {
    return this.formBuilder.group({
      img: [p.img, [Validators.required]],
      name: [p.name, [Validators.required]],
      category: [p.category, [Validators.required]],
      demoURL: [p.demoURL, [Validators.required]],
      gitURL: [p.gitURL, [Validators.required]],
      frontend: this.createNewForm(),
      backend: this.createNewForm(),
      framework: this.createNewForm(),
      library: this.createNewForm(),
      database: this.createNewForm(),
      font: this.createNewForm(),
      icon: this.createNewForm(),
    });
  }

  createNewForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      url: [''],
      icon: [''],
    });
  }

  // --------------------------Add Description items---------------------------------------------//

  addNewItem(listArrayIndex: number, key: string, value: any = null) {
    // console.log('add new item', listArrayIndex, key, value, this.description);
    if(!value) {
      this.description[listArrayIndex][key].unshift({
        name: this.listArray.controls[listArrayIndex].get(key).get('name').value,
        url: this.listArray.controls[listArrayIndex].get(key).get('url').value,
        icon: this.listArray.controls[listArrayIndex].get(key).get('icon').value,
      });
      this.listArray.controls[listArrayIndex].get(key).reset();

    } else{

      this.description[listArrayIndex][key].unshift({
        name: value.name ? value.name : '',
        url: value.url ? value.url : '',
        icon: value.icon ? value.icon : '',
      });
    }
  }

  // --------------------------Open Modal box when project is clicked on---------------------------------------------//
  openDialog(project: portfolioData) {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.autoFocus = false;
    dialogConfig.data = project;

    this.dialog.open(ProjectDialogComponent, dialogConfig);
  }

  // ---------------------------Populate List array----------------------------------------------------------------- //
  populateListArray() {

    this.listArray.insert(0, this.createItem({
      _id: '',
      img: '',
      name: 'New Item',
      category: '',
      demoURL: '',
      gitURL: '',
    }));
    this.description.unshift({
      frontend: [],
      backend: [],
      framework: [],
      library: [],
      database: [],
      font: [],
      icon: []
    });
  }

  // ---------------------------Populate Portfolio Variable--------------------------------------------------------- //
  populatePortfolio() {
    this.portfolios.unshift({
      _id: '',
      img: '',
      name: 'New Item',
      category: '',
      demoURL: '',
      gitURL: '',
      description: {
        frontend: [],
        backend: [],
        framework: [],
        database: [],
        library: [],
        font: [],
        icon: [],
      }
    });
  }

  // ---------------------------Action performed when Add New Button is pressed------------------------------------- //
  createPortfolio() {
    this.populateListArray();
    this.populatePortfolio();
  }

  // ---------------------------Action performed when Save button is pressed---------------------------------------- //
  save(id: number, formGroup: FormGroup) {
    // this.isloading = true;
    this.eventCaller = id;
    const p = this.portfolios[id];
    const newProject = {
      _id: p._id || '',
      img: formGroup.controls.img.value,
      name: formGroup.controls.name.value,
      category: formGroup.controls.category.value,
      demoURL: formGroup.controls.demoURL.value,
      gitURL: formGroup.controls.gitURL.value,
      description: this.description[id],
    };

    // Call Api for Edit Portfolio
    p._id ? this.userService.editPortfolio(newProject) : this.userService.newPortfolio(newProject);
  }

  // ---------------------------Action performed when delete button is pressed-------------------------------------- //
  delete(id: number) {
    // this.isloading = true;
    this.eventCaller = id;
    this.userService.deletePortfolio(this.portfolios[id]._id);
  }

}
