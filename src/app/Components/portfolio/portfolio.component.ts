import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { portfolioData } from '../../Models/portfolioData.model';
import { user } from '../../Models/user.model';
import * as $ from 'jquery';
import * as jQueryBridget from 'jquery-bridget';
import * as Isotope from 'isotope-layout';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewChecked {

  items: portfolioData[] = [
    {
      _id: '',
      img: '../../../assets/images/defaultUser.jpg',
      name: '',
      category: '',
      demoURL: '',
      gitURL: '',
    },
    {
      _id: '',
      img: '../../../assets/images/defaultUser.jpg',
      name: '',
      category: '',
      demoURL: '',
      gitURL: '',
    },
  ];

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService) {
  }

  ngAfterViewChecked( ) {
    $('.portfolio-item > div').addClass( 'col-lg-4 col-md-4 col-8 item mb-5' );
  }

  ngOnInit() {

    // Fetch Data of portfolio from api
    this._userService.getUser().subscribe( (response: user) => {
      this.items = response.portfolio;
    });

    // JQuery
    jQueryBridget( 'isotope', Isotope, $ );
    $('.portfolio-item').isotope({
      itemSelector: '.item',
      layoutMode: 'fitRows'
    });

    $('.portfolio-menu ul li').click( function() {
      $('.portfolio-menu ul li').removeClass('active');
      $(this).addClass('active');

      const selector = $(this).attr('data-filter');
      $('.portfolio-item').isotope({
        filter: selector
      });
      return false;
    });
  }
}
