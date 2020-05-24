import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Router, NavigationEnd} from '@angular/router';
import { WindowService } from 'src/app/Services/window.service';
import { MenuService } from 'src/app/Services/menu.service';
import { filter, switchMap} from 'rxjs/operators';
import { ReviewService } from 'src/app/Services/review.service';
import { QuestionsService } from 'src/app/Services/questions.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fadeToggle', [
      state('initial', style({
        opacity: 1,
        'z-index': 10,
      })),
      state('final', style({
        opacity: 0,
        'z-index': -1,
        position: 'absolute',
      })),
      transition('initial=>final', animate('10ms ease-out')),
      transition('final=>initial', animate('10ms ease-out'))
    ]),
    trigger('warning', [
      state('initial', style({
        color: 'red'
      })),
      state('final', style({
        color: 'red'
      })),
      transition('initial=>final', animate('300ms', keyframes([
          style({color: 'red', opacity: 0, offset: 0}),
          style({opacity: 1, offset: 0.33}),
          style({color: 'white', offset: 0.5}),
          style({color: 'red', offset: 1})
        ])
      )),
      transition('final=>initial', animate('350ms', keyframes([
          style({color: 'red', opacity: 0, offset: 0}),
          style({opacity: 1, color: 'red', offset: 0.23}),
          style({opacity: 1, color: 'white', offset: 0.5}),
          style({color: 'white', offset: 0.75}),
          style({color: 'red', offset: 1})
        ])
      ))
    ]),
  ]
})
export class MenuComponent implements OnInit, OnDestroy {

  // Menu Buttons display checks
  showExitBtn = false;
  showConfirmBtn = false;
  showHelpBtn = false;
  showMarkBtn = false;
  showPauseBtn = false;
  showNextBtn = false;
  showTimeBtn = false;
  showReviewBtn = false;
  warningFlag = true;
  pauseTimeFlag = false;

  // Immediate Next Check
  immediateNext = false;

  // Animation States
  warningState = 'initial';
  currentState = 'initial';
  currentStateToggle = 'final';
  markCurrentState = 'initial';
  markCurrentStateToggle = 'final';
  hideTimeCurrentState = 'initial';
  hideTimeCurrentStateToggle = 'final';

  // other parameters
  params: number;
  selectedQuestion = 1;
  warningText = '';
  timer: any;
  private currentUrl = '';
  nextBtnNavigateTo = '';

  constructor(
    private router: Router,
    private windowService: WindowService,
    private menuService: MenuService,
    private reviewService: ReviewService,
    private questionService: QuestionsService,
  ) {
    console.log('Menu Created');
  }

  // set animation state for next button
  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.changeCurrentStateToggle();
  }

  // set animation state for warning text.
  changeWarningState(warningText: string) {
    this.warningState = this.warningState === 'initial' ? 'final' : 'initial';
    this.warningText = warningText;
  }

  // set animation state for confirm button
  changeCurrentStateToggle() {
    this.currentStateToggle = this.currentStateToggle === 'initial' ? 'final' : 'initial';
  }

  // set animation state for mark button
  markChangeState() {
    this.reviewService.mark(this.markCurrentState === 'initial' ? true : false);
  }

  // Action perform by review btn when clicked
  reviewFn() {
    this.router.navigate(['/gre/review']);
  }

  // set animation state for hide time button
  hideTimeChangeState() {
    this.hideTimeCurrentState = this.hideTimeCurrentState === 'initial' ? 'final' : 'initial';
    const temp = this.hideTimeCurrentState === 'initial' ? true : false;
    this.menuService.updateTimeFlag(temp);
    this.hideTimeChangeCurrentStateToggle();
  }

  // set animation state for show time button
  hideTimeChangeCurrentStateToggle() {
    this.hideTimeCurrentStateToggle = this.hideTimeCurrentStateToggle === 'initial' ? 'final' : 'initial';
  }

  // Auto toggle between next and confirm button
  autoToggle() {
    this.changeState();
    this.changeWarningState('Press CONFIRM button to verify you want to go forward.');
    this.timer = setTimeout( () => {
      this.changeState();
      this.changeWarningState('unconfirmed ... returned to original button state.');
    }, 3000);
  }

  // Warning if next btn not clicked first
  warningNext() {
    this.changeWarningState('You must click the NEXT button to proceed');
  }

  // Warning if next btn is already clicked first
  warningConfirm() {
    this.changeWarningState('You must click the CONFIRM button after NEXT button to proceed');
  }

  // Reset all Boolean flags
  resetBtns() {
    this.showExitBtn = false;
    this.showConfirmBtn = false;
    this.showHelpBtn = false;
    this.showMarkBtn = false;
    this.showReviewBtn = false;
    this.showPauseBtn = false;
    this.showNextBtn = false;
    this.showTimeBtn = false;
    this.warningFlag = false;
    this.pauseTimeFlag = false;
    this.warningText = '';
    this.nextBtnNavigateTo = '';
    this.warningState = 'initial';
    this.currentState = 'initial';
    this.currentStateToggle = 'final';
    this.markCurrentState = 'initial';
    this.markCurrentStateToggle = 'final';
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  // Action performed after exit btn clicked
  exitFn() {
    this.menuService.updateExitFlag(true);
  }

  // Action performed after help btn clicked
  helpFn() {
    this.windowService.openHelpWindow();
  }

  // Action performed after pause btn clicked
  pauseTime() {
    // console.log('pause function', true);
    this.menuService.updatePauseTime(true);
    this.menuService.updateResumeFlag(true);
  }

  // Set flags and next btn navigation destination according to current url
  updateRoutes() {
    switch (this.currentUrl) {
      case '/gre/examDirections': {
        this.resetBtns();
        // Allowed Menu Buttons
        this.showExitBtn = true;
        this.showNextBtn = true;

        // Next Button Config
        this.immediateNext = true;
        this.nextBtnNavigateTo = '/gre/examOptions';
        this.params = -1;
        break;
      }
      case '/gre/examOptions': {
        this.resetBtns();
        // Allowed Menu Buttons
        this.showExitBtn = true;
        this.showNextBtn = true;
        this.showConfirmBtn = true;
        this.warningFlag = true;

        // Next Button Config
        this.immediateNext = false;
        this.nextBtnNavigateTo = '/gre/questions';
        this.params = 0;

        // Default section time
        localStorage.setItem('sectionTime', '1800000');
        break;
      }
      case '/gre/questions/1':
      case '/gre/questions/2':
      case '/gre/questions/3':
      case '/gre/questions/4':
      case '/gre/questions/5':
      case '/gre/questions/6':
      case '/gre/questions/7':
      case '/gre/questions/8':
      case '/gre/questions/9':
      case '/gre/questions/10':
      case '/gre/questions/11':
      case '/gre/questions/12':
      case '/gre/questions/13':
      case '/gre/questions/14':
      case '/gre/questions/15':
      case '/gre/questions/16':
      case '/gre/questions/17':
      case '/gre/questions/18':
      case '/gre/questions/19':
      case '/gre/questions/20': {
        this.resetBtns();
        // Allowed Menu Buttons
        this.showExitBtn = true;
        this.showNextBtn = true;
        this.showConfirmBtn = true;
        this.warningFlag = true;
        this.showHelpBtn = true;
        this.showMarkBtn = true;
        this.showReviewBtn = true;
        this.showPauseBtn = true;
        this.showTimeBtn = true;
        this.warningFlag = true;

        // Next Button Config
        this.immediateNext = false;
        this.nextBtnNavigateTo = '/gre/questions';
        break;
      }
      case '/gre/review': {
        this.resetBtns();
        // Allowed Menu Buttons
        this.showExitBtn = true;
        this.showNextBtn = true;

        // Next Button Config
        this.immediateNext = true;
        this.reviewService.sq.subscribe( selectedQuestion => {
          this.nextBtnNavigateTo = '/gre/questions';
          this.selectedQuestion = selectedQuestion;
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  // Action according to current url if next button clicked
  nextBtnLink() {
    if (this.immediateNext) {
      if (this.currentUrl === '/gre/review') {
        this.router.navigate([this.nextBtnNavigateTo, this.selectedQuestion]);
      } else {
        this.router.navigate([this.nextBtnNavigateTo]);
      }
      return;
    } else if (!this.immediateNext) {
      // console.log('before condition', this.params);
      if (this.params >= 0 && this.params <= 20 && !isNaN(this.params) && this.currentState === 'final') {
        // console.log('Next button');
        // console.log('Before Update', this.params);
        this.menuService.updateQuestionId(this.params + 1);
        // console.log('After Update', this.params);

        this.menuService.getQuestionId()
        .subscribe( id => {
          Promise.resolve(id).then( value => {
            this.router.navigate([this.nextBtnNavigateTo, (value)]);
            // console.log('In promise', value);
          });
        });

        return;
      }
      this.autoToggle();
      return;
    }
  }

  // subscribe to current Question's mark state
  getCurrentQuestionMarkState(questionId) {
    this.questionService.questions.pipe(
      switchMap( questions => {
        return this.reviewService.getCurrentMakState();
      })
    ).subscribe( data => {
      if (data[questionId - 1] !== undefined) {
        this.markCurrentState = data[questionId - 1].mark ? 'final' : 'initial';
        this.markCurrentStateToggle = data[questionId - 1].mark ? 'initial' : 'final';
      }
    });
  }

  // Check if page reload/refreshes
  checkPageRefreshed() {
    return window.performance.navigation.type === 1;
  }

  // update Params
  updateParams() {
    if (this.currentUrl.indexOf('question') > -1 && this.currentUrl.split('/')[3] !== undefined) {
      this.params =  +this.currentUrl.split('/')[3] ;
    }
  }

  // Main working after routing
  mainWorking() {
    this.updateParams();
    this.updateRoutes();
    if (this.currentUrl.indexOf('question') > -1) {
      console.log('url', this.currentUrl.indexOf('question'))
      this.getCurrentQuestionMarkState(this.params);
      this.reviewService.updateSelectedQuestion(this.params);
    }
  }

  ngOnInit() {
    this.menuService.getQuestionId().subscribe( id => {
      this.params = id;
    });

    this.currentUrl = this.router.url;
    this.updateParams();
    this.updateRoutes();

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

  ngOnDestroy() {
    // this.router.event.unsubscribe();
  }
}
