import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-pause-time',
  templateUrl: './pause-time.component.html',
  styleUrls: ['./pause-time.component.css']
})
export class PauseTimeComponent implements OnInit {

  constructor(private menuService: MenuService) {
    console.log('Pause Time Created');
  }

  ngOnInit() {
  }

  resumeAction() {
    // console.log('resume function', false);
    this.menuService.updatePauseTime(false);
    this.menuService.updateResumeFlag(false);
  }
}
