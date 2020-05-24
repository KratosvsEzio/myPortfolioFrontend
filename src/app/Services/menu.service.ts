import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private timeFlag = new Subject<boolean>();
  private selectedTime = new BehaviorSubject<number>(1800000);
  private questionId = new BehaviorSubject<number>(0);
  private showUtilityFlag = new BehaviorSubject<boolean>(false);
  private pauseTimeFlag = new BehaviorSubject<boolean>(false);
  private exitFlag = new BehaviorSubject<boolean>(false);
  private resumeFlag = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Get Question Id Value
  getQuestionId(): Observable<number> {
    return this.questionId.asObservable().pipe(
      shareReplay()
    );
  }

  updateQuestionId(value: number) {
    this.questionId.next(value);
  }

  // Selected Resume Flag
  getResumeFlag(): Observable<boolean> {
    return this.resumeFlag.asObservable().pipe(
      shareReplay()
    );
  }

  updateResumeFlag(value: boolean) {
    this.resumeFlag.next(value);
  }

  // Selected Time Value
  getSelectedTime(): Observable<number> {
    return this.selectedTime.asObservable().pipe(
      shareReplay()
    );
  }

  updateSelectedTime(value: number) {
    this.selectedTime.next(value);
  }


  // Exit Flag
  getExitFlag(): Observable<boolean> {
    return this.exitFlag.asObservable().pipe(
      shareReplay()
    );
  }

  updateExitFlag(value: boolean) {
    this.exitFlag.next(value);
  }


  // Pause Time Flag
  getPauseTime(): Observable<boolean> {
    return this.pauseTimeFlag.asObservable().pipe(
      shareReplay()
    );
  }

  updatePauseTime(value: boolean) {
    this.pauseTimeFlag.next(value);
  }


  // Show Utility content Flag
  getShowUtilityFlag(): Observable<boolean> {
    return this.showUtilityFlag.asObservable().pipe(
      shareReplay()
    );
  }

  updateShowUtilityFlag(value: boolean) {
    this.showUtilityFlag.next(value);
  }


  // Show Time Flag
  getTimeFlag(): Observable<boolean> {
    return this.timeFlag.asObservable().pipe(
      shareReplay()
    );
  }

  updateTimeFlag(value: boolean) {
    this.timeFlag.next(value);
  }
}
