import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-exam-options',
  templateUrl: './exam-options.component.html',
  styleUrls: ['./exam-options.component.css']
})
export class ExamOptionsComponent implements OnInit {

  customTimeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private menuService: MenuService) {
    console.log('Exam Options Created');
  }

  get f() { return this.customTimeForm.controls; }

  ngOnInit() {
    this.customTimeForm = this.formBuilder.group({
      customTime: new FormControl('1800000'),
    });
    if (window.performance.navigation.type === 0) {
      localStorage.setItem('remainingTime', '0');
    }
  }

  submit() {
    const formData = {
      customTime: this.f.customTime.value,
    };
    if (window.performance.navigation.type === 0) {
      console.log(formData.customTime.toString());
      localStorage.setItem('remainingTime', '0');
      localStorage.setItem('sectionTime', formData.customTime.toString());
      this.menuService.updateSelectedTime(formData.customTime);
    }
  }

}
