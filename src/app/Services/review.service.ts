import { Injectable } from '@angular/core';
import { ReviewModel } from '../Models/review.models';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswersService } from './answers.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private selectedQuestion = new BehaviorSubject<number>(1);
  sq = this.selectedQuestion.asObservable();

  private questionsReviewArray = new BehaviorSubject<ReviewModel[]>([]);
  reviewArray = this.questionsReviewArray.asObservable();
  private reviewData: ReviewModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private answersService: AnswersService) {}

  // Populate the empty array of QuestionReviewArray Observable First time Questions api triggers
  populateArray(questions: any[]) {
    this.reviewData = questions.map( (question: { id: any; question_type: any; options: any }, index) => {
      return {
        id: index + 1,
        mark: false,
        answer: 'Not Visited',
        visited: false,
      };
    });
    // console.log('Inside Populate Array of Review', this.reviewData);
    this.questionsReviewArray.next(this.reviewData);
    this.updateAnswer();
  }

  // Update answer in Review Array if Answers Array in updated
  updateAnswer() {
    this.answersService.getAnswers().subscribe( answersArray => {
      this.reviewData = this.reviewData.map( (review, index) => {
        return {
          id: index + 1,
          mark: false,
          answer: this.checkAnswers(answersArray[index]),
          visited: false,
        };
      });
      this.questionsReviewArray.next(this.reviewData);
    });
  }

  // Check if all the answers of the question is being
  checkAnswers(answersArray): string {
    let check = 0;
    answersArray.answers.forEach(a => {
      if (a.answer === 'Not Answered') {
        check = 0;
      } else {
        check++;
      }
    });
    if (answersArray.answers.length === check) {
      return 'Answered';
    } else if (answersArray.answers.length > check && check > 0) {
      return 'Answered Incomplete';
    } else {
      return 'Not Answered';
    }
  }

  // Update Question Id whose row is been clicked on
  updateSelectedQuestion(id: number) {
    this.selectedQuestion.next(id);
  }

  // Send Review array Observable to check current mark State
  getCurrentMakState(): Observable<ReviewModel[]> {
    return this.reviewArray;
  }

  // Update mark in Review Array
  mark(markCheck: boolean) {
    // console.log('inside mark service', this.router.url.split('/')[3], markCheck);
    const questionId = this.router.url.split('/')[3];
    // console.log(this.reviewData);
    if (this.reviewData[+questionId - 1 ] !== null && this.reviewData[+questionId - 1 ] !== undefined) {
      this.reviewData[+questionId - 1 ].mark = markCheck;
      this.questionsReviewArray.next(this.reviewData);
    }
    // console.log('inside mark service', this.reviewData);
  }

  // Update visited in Review Array
  visited(questionId: number) {
    // console.log('inside visited', questionId);
    // console.log(this.reviewData);
    if (this.reviewData[questionId - 1 ] !== null && this.reviewData[questionId - 1 ] !== undefined) {
      this.reviewData[questionId - 1 ].visited = true;
      this.questionsReviewArray.next(this.reviewData);
      // console.log(this.reviewData);
    }
  }
}
