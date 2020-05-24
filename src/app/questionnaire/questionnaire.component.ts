import { Component, OnInit, HostListener } from '@angular/core';
import { MenuService } from '../Services/menu.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  currentUrl = '';
  exitFlag = false;
  pauseTimeFlag = false;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // if (event.keyCode === 123 || event.keyCode === 116 || event.keyCode === 44) {
    //   return false;
    // }
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        return false;
    }
    if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
        return false;
    }
    if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
        return false;
    }
    if (event.ctrlKey && event.keyCode === 85) {
        return false;
    }
    // console.log(event);
  }

  constructor(private menuService: MenuService) {
    console.log('Questionnaire Created');
  }

  ngOnInit() {

    this.menuService.getExitFlag().subscribe( (value) => {
      this.exitFlag = value;
    });

    this.menuService.getResumeFlag().subscribe( value => {
      this.pauseTimeFlag = value;
    });
  }
}
