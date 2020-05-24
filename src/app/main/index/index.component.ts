import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../Services/window.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private windowService: WindowService, private router: Router) { }

  ngOnInit() {
  }

  openWindow() {
    this.router.navigateByUrl('/gre/');
    this.windowService.openWindow();
  }

  logout() {
    this.router.navigateByUrl('/auth/signin');
  }

}
