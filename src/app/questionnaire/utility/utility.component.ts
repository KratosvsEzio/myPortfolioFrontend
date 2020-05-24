import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';
import { filter } from 'rxjs/operators';
import { LoadingService } from 'src/app/Services/loading.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  currentUrl = '';

  // Boolean Flags
  timeFlag = true;
  showUtility = false;
  pauseFlag: boolean;
  resumeFlag: boolean;
  loadingFlag: boolean;

  // Time
  min = 0;
  sec = 0;
  timeSelected = 0;
  remainingTime = 0;
  countDownTime = 0;
  state = 0; // 0 = default, 1 = running, 2 = pause, 3 = resume
  timeInterval;
  questionNumber: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private loadingService: LoadingService,
  ) {
    console.log('Utility Created');
  }

  ngOnInit() {

    this.menuService.getResumeFlag().subscribe( (value: boolean) => {
      this.resumeFlag = value;
    });

    // page Reload
    this.currentUrl = this.router.url;
    this.questionNumber =  +this.currentUrl.split('/')[3];
    this.checkUrl(this.router.url);

    // If url is changed
    this.router.events.pipe( filter(event => event instanceof NavigationEnd) ).subscribe((navEnd: NavigationEnd) => {
      this.currentUrl = navEnd.urlAfterRedirects;
      this.questionNumber =  +this.currentUrl.split('/')[3];
      this.checkUrl(navEnd.urlAfterRedirects);
    });

    // Check to Show time or not.
    this.menuService.getTimeFlag().subscribe( flag => {
      this.timeFlag = flag;
    });
  }

  checkUrl(url: string) {
    if (url.indexOf('questions') > -1) {
      this.showUtility = true;
      this.setSectionTime();
    } else {
      if (this.showUtility) {
        this.showUtility = false;
        if (this.state !== 0) {
          this.menuService.updatePauseTime(true);
          this.menuService.updateResumeFlag(false);
          clearInterval(this.timeInterval);
        }
      }
    }
  }

  setSectionTime() {
    this.menuService.getSelectedTime().subscribe( (time) => {
      this.timeSelected = +time;

      // check wether page is reloaded or not
      this.reloadPage();
      this.state = 1;

      // check wether timer is paused or not
      this.pauseTime();
    });
  }

  reloadPage() {
    // Set CountDown Time and state of TimeInterval\
    // Check if page is refreshed or not
    if (window.performance.navigation.type !== 0) {

      // check if timer was started before and has value greater than 0 or not
      if (+localStorage.getItem('remainingTime') > 0) {
        this.countDownTime = +localStorage.getItem('remainingTime') + new Date().getTime();
      } else {
        this.countDownTime = +localStorage.getItem('sectionTime') + new Date().getTime();
      }
      return;

    } else {

      // if page was not refreshed before then set countdown time to section time
      this.countDownTime = this.timeSelected + new Date().getTime();
    }
  }

  pauseTime() {
    this.menuService.getPauseTime().subscribe( (pauseFlag: boolean) => {
      clearInterval(this.timeInterval);
      if (!this.resumeFlag) {
        pauseFlag = this.resumeFlag;
      }
      this.pauseFlag = pauseFlag;

      if (!pauseFlag && (this.remainingTime > 0) && (this.currentUrl.indexOf('questions') > -1)) {
        // resume timer if value of state is 3
        this.state = 3;
        this.countDownTime = this.remainingTime + new Date().getTime();
        this.startCountDown();
      } else if (pauseFlag) {

        // pause timer if value of state is 2
        this.state = 2;
        clearInterval(this.timeInterval);
      } else {

        // if loading flag is false only then allow timer to start
        this.loadingService.loading.subscribe( flag => {
          this.loadingFlag = flag;
          if (!flag) {
            this.startCountDown();
          }
        });
      }
    });
  }

  startCountDown() {

    // start timer
    this.timeInterval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // If the count down is over, write some text
      if (this.remainingTime < 0 || this.state === 2) {
        clearInterval(this.timeInterval);
      }

      // Find the distance between now and the count down date
      if (!this.resumeFlag) {
        this.remainingTime = this.countDownTime - now;
        localStorage.setItem('remainingTime', this.remainingTime.toString());
      }

      // Time calculations for days, hours, minutes and seconds
      // const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      // const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.min = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      this.sec = Math.floor((this.remainingTime % (1000 * 60)) / 1000);

    }, 1000);
  }

}

