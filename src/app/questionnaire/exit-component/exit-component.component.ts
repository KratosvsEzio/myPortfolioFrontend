import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/Services/window.service';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-exit-component',
  templateUrl: './exit-component.component.html',
  styleUrls: ['./exit-component.component.css']
})
export class ExitComponentComponent implements OnInit {

  constructor(private windowService: WindowService, private menuService: MenuService) {
    console.log('Exit Created');
  }

  ngOnInit() {
  }

  returnToTest() {
    this.menuService.updateExitFlag(false);
  }

  closeWindow() {
    this.windowService.closeWindow();
  }

}
