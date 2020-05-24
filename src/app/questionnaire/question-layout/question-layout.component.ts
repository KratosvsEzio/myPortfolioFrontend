import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionsService } from 'src/app/Services/questions.service';
import { QuestionsModel } from 'src/app/Models/questions.models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReviewService } from 'src/app/Services/review.service';
import { filter, take, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-layout',
  templateUrl: './question-layout.component.html',
  styleUrls: ['./question-layout.component.css']
})
export class QuestionLayoutComponent implements OnInit, OnDestroy {
  questions: QuestionsModel[];
  index: number;
  currentUrl: string;
  params: number;
  questions$: Observable<QuestionsModel[]>;

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
  ) {
    console.log('Question Layout Created');
  }

  ngOnInit() {
    // this.route.params.subscribe( params => {
    //   this.index = params.id - 1;
    // });

    this.currentUrl = this.router.url;
    this.getQuestions();

    // When page reload/refreshes
    if (this.checkPageRefreshed() && this.params !== undefined) {
      console.log('after refresh');
      this.mainWorking();
    }

    // When route redirects to different url through navigation
    this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe((navEnd: NavigationEnd) => {
      console.log('Not Refresh');
      this.currentUrl = navEnd.urlAfterRedirects;
      this.mainWorking();
    });
  }

  // Main working after routing
  mainWorking() {
    this.updateParams();
    this.reviewService.visited(this.params);
  }

  // get Questions
  getQuestions() {
    console.log('inside GetQuestions');
    if ( this.currentUrl.indexOf('questions') > -1) {
      console.log('inside GetQuestions');
      this.questionsService.checkQuestionsStatus.subscribe(status => {
        if (!status) {
          this.questionsService.getAllQuestions();
        }
      });
      // this.questions$ = this.questionsService.questions;
      // this.mainWorking();
      this.questionsService.questions.subscribe( (res) => {
        this.questions = res;
        this.mainWorking();
      });
    }
  }

  // Check if page reload/refreshes
  checkPageRefreshed() {
    return window.performance.navigation.type === 1;
  }

  // update Params
  updateParams() {
    if (this.currentUrl.indexOf('question') > -1 && this.currentUrl.split('/')[3] !== undefined) {
      this.params =  +this.currentUrl.split('/')[3] ;
      this.index = this.params - 1;
    }
  }

  ngOnDestroy() {
    // this.questionsService.questions.unsubscribe();
  }

}
