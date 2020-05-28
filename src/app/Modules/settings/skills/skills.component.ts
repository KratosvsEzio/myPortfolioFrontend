import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service.js';
import { user } from '../../../Models/user.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';
import { UserDataService } from '../../../Service/user-data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: {
    _id: any;
    skill: any;
  }[];

  indexStart = 0;
  indexEnd = 5;
  activePage = 1;
  lastPage = 1;
  skillCount: number;
  skillsForm: FormGroup;
  isloading = false;
  eventCaller = -1;
  // tslint:disable-next-line: variable-name
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userDataService: UserDataService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    // this.route.params.subscribe( (page) => {
    //   this.updatePage(page.pageNumber);
    //   // pageIndex = page.pageNumber;
    // });

    this.skillsForm = this.formBuilder.group({
      listArray: this.formBuilder.array([
      ])
    });

    this.userDataService.currentUpdatedUser.subscribe( (response: user) => {
      if (response.portfolio) {
        this.isloading = true;
        this.skills = [...response.skills];
        this.skillCount = response.skillCount;
      }

      this.route.params.subscribe( (page) => {
        this.updatePage(page.pageNumber);

        // Remove Previous controls in List Array create inputs
        while (this.listArray.length !== 0) {
          this.listArray.removeAt(0);
        }

        this.fillSkillInForm(response.skills);
      });
    });

  }

  // Fill New Array List in the Skill Form Whenever page changes
  fillSkillInForm(skills: { skill: string; }[]) {
    skills.forEach((skill: { skill: string; }, index: number) => {
      if (index >= this.indexStart && index < this.indexEnd) {
        // console.log('inside filter', skill);
        this.listArray.push(new FormControl(skill.skill, [Validators.required]));
      }
    });
    // console.log(this.listArray.value)
  }

  get listArray() { return this.skillsForm.get('listArray') as FormArray; }

  get f() { return this.skillsForm.controls; }

  createSkill() {
    this.listArray.insert(0, new FormControl('New Skill', [Validators.required]));
    this.skills.unshift({_id: '', skill: 'New Skill'});
  }

  save(id: number, skillId: string) {
    // this.isloading = true;
    this.eventCaller = id;
    const s = this.skills.filter( (item) => {
      if ( skillId !== '' && item._id === skillId ) {
        return item;
      }
    });

    if ( s.length !== 0 ) {
      // Call Api for Edit Skill
      this.userService.editSkill({_id: skillId, skill: this.f.listArray.value[id]});
    } else {
      // Call Api for New Skill
      this.userService.newSkill(this.f.listArray.value[id]);
    }
  }

  delete(id: number, skillId: string) {
    // this.isloading = true;
    this.eventCaller = id;
    this.userService.deleteSkill(skillId);
  }

  paginationPages(length: number) {
    this.lastPage = Math.ceil(length / 5);
    return new Array(Math.ceil(length / 5));
  }

  updatePage(pageIndex: number) {
    this.indexStart = (pageIndex - 1) * 5;
    this.indexEnd = this.indexStart + 5;
    this.activePage = (pageIndex - 1) + 1;
  }

  nextPage() {
    this.indexStart += 5;
    this.indexEnd += 5;
    this.activePage++;
    this.router.navigate(['/settings/skills', this.activePage ]);
  }

  prevPage() {
    this.indexStart -= 5;
    this.indexEnd -= 5;
    this.activePage--;
    this.router.navigate(['/settings/skills', this.activePage ]);
  }
}
