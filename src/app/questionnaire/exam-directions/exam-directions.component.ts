import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-directions',
  templateUrl: './exam-directions.component.html',
  styleUrls: ['./exam-directions.component.css']
})
export class ExamDirectionsComponent implements OnInit {

  abc = 'of the  <span>Educational</span> Testing';
  constructor() {
    console.log('Exam Directions Created');
  }

  ngOnInit() {
  }

}
