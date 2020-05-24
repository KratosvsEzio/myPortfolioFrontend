import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/Services/review.service';
import { ReviewModel } from 'src/app/Models/review.models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews: Observable<ReviewModel[]>;
  prevSelectedQuestion: number;
  selectedQuestion = -1;
  rowSelected = false;
  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviews = this.reviewService.reviewArray;
    this.reviewService.sq.pipe(take(1)).subscribe( selectedQuestion => {
      this.prevSelectedQuestion = selectedQuestion;
    });
  }

  selectQuestion(review: ReviewModel) {
    if (review.visited && this.selectedQuestion !== review.id) {
      this.selectedQuestion = review.id;
      this.reviewService.updateSelectedQuestion(review.id);
    } else if (review.visited && this.selectedQuestion === review.id) {
      this.selectedQuestion = -1;
      this.reviewService.updateSelectedQuestion(this.prevSelectedQuestion);
    }
  }
}
