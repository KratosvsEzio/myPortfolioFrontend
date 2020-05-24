import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private myWindow: Window;
  private help: any = {};
  constructor() { }

  openWindow() {
    this.myWindow = window.open('/gre', '_blank', 'width= 1200, height= 950');
  }

  openHelpWindow() {
    this.help = window.open('/gre/help', 'help', 'width= 1200, height= 950');
  }

  closeWindow() {
    window.close();
  }
}
