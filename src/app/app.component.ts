import { Component, OnInit } from '@angular/core';
import { SigninService } from './Service/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myPortfolio';
  constructor(private signinService: SigninService) {}

  ngOnInit() {
    this.signinService.autoAuth();
  }
}
