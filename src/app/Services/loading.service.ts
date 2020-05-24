import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading: Observable<boolean> = this.loadingSubject.asObservable();
  constructor() { }

  showLoaderUntilCompleted(obs: Observable<any>): Observable<any> {
    this.loadingOn();
    return obs.pipe(
      finalize( () => this.loadingOff())
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
