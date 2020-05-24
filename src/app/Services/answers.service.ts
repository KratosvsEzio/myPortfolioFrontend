import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerModel } from '../Models/answers.model';
import { QuestionsModel } from '../Models/questions.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private answersSubject = new BehaviorSubject<AnswerModel[]>([]);
  answers: Observable<AnswerModel[]> = this.answersSubject.asObservable();
  private answerArray: AnswerModel[] = [];

  constructor() {}

  // Populate the empty array of answersSubject Observable First time Questions api triggers
  populateArray(questions: any[]) {
    // console.log('From Populate array', questions);

    this.answerArray = questions.map( (question: { id: any; question_type: any; options: any }) => {
      const answers = [];
      if ( question.options !== null &&
        question.options !== undefined &&
        question.options !== [] &&
        question.options[0] !== undefined
      ) {
        question.options.forEach(() => {
          answers.push({
            answer: 'Not Answered'
          });
        });
      }
      return {
        question_detail: question.id,
        question_type: question.question_type,
        answers,
      };
    });

    // console.log('Inside Populate Array of Answer', tempArray);
    this.answersSubject.next(this.answerArray);
  }

  // Get the answers Observable
  getAnswers() {
    return this.answers;
  }

  updateAnswers(question_detail: number, answers: {answer: string}[]) {
    // this.answerArray[answerIndex] = value;
  }
}
