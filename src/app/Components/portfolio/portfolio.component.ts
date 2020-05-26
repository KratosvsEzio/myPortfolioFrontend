import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { portfolioData } from '../../Models/portfolioData.model';
import { user } from '../../Models/user.model';
import * as $ from 'jquery';
import * as jQueryBridget from 'jquery-bridget';
import * as Isotope from 'isotope-layout';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from 'src/app/Service/user-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewChecked {
  itemsObservable: Observable<portfolioData[]>;

  constructor(private userDataService: UserDataService) {
  }

  ngAfterViewChecked( ) {
    $('.portfolio-item > div').addClass( 'col-lg-4 col-md-4 col-8 item mb-5' );
  }

  ngOnInit() {
    // Fetch Data of portfolio from api

    this.itemsObservable = this.userDataService.currentUpdatedUser.pipe(
      map( (data: user) => {
        return data.portfolio;
      })
    );

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
