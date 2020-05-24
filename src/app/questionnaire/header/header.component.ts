import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/Services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: any;

  constructor(private route: Router, private windowService: WindowService) {
    console.log('Header Created');
  }

  ngOnInit() {
    this.currentRoute = this.route.url;
  }

  closeWindow() {
    this.windowService.closeWindow();
  }

}
