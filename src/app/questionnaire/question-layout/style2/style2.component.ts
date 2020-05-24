import { Component, OnInit, Input } from '@angular/core';
import { QuestionsModel } from 'src/app/Models/questions.models';
import { AnswersService } from 'src/app/Services/answers.service';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { passValidator } from 'src/app/Shared/custom-validator';

@Component({
  selector: 'app-style2',
  templateUrl: './style2.component.html',
  styleUrls: ['./style2.component.css']
})
export class Style2Component implements OnInit {
  @Input() question: QuestionsModel;

  questionForm: FormGroup;

  constructor(
    private answersService: AnswersService,
    private formBuilder: FormBuilder
  ) {
    console.log('Style 2 Created');
  }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      options: this.formBuilder.array([]) ,
    });

    this.addOptions();

    // console.log(this.options.controls[0].controls.optionA.value);
    // console.log(this.questionForm.controls.options.controls[0].controls.optionA.value);
  }

  // getter of FormArray
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // creating new FormGroup of Options
  newOptions(): FormControl {
    return new FormControl('');
  }

  // add new options FormGroup in From Array
  addOptions() {
    console.log(this.question);
    if (this.question.options[0] !== undefined) {
      this.question.options.forEach( (options) => {
        // console.log(this.questionForm.get('options'));
        this.options.push(this.newOptions());
      });
    }
  }

  onChange() {

    const answer = [this.options.controls[0].value, this.options.controls[1].value, this.options.controls[2].value];
    console.log(answer);
    // const answers = [
    //   {answer: }
    // ];
    // this.answersService.updateAnswers(this.question.id, answers[]);
  }

}
