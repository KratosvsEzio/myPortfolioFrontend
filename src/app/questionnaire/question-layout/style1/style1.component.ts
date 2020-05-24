import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style1',
  templateUrl: './style1.component.html',
  styleUrls: ['./style1.component.css']
})
export class Style1Component implements OnInit {

  constructor() {
    console.log('Style 1 Created');
  }

  ngOnInit() {
  }

}
