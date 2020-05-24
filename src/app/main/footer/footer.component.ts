import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // set animation for toggle button
  changeState(t) {
    $(t).slideToggle();
    console.log(t);
  }

  ngOnInit() {

   const data = {
    test_taker: 1,
    test_id: 1,
    question: [
      {
        question_id: 1,
        answer: 1,
        custom_answer: 'dfgdfgfdg',
        time_spent: 5657567,
      },
    ],
   };
   console.log(data);
  }

}
