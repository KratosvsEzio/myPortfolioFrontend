import { Component, OnInit, OnDestroy } from '@angular/core';
import { portfolioData } from '../../Models/portfolioData.model';
import { user } from '../../Models/user.model';
import * as $ from 'jquery';
import * as jQueryBridget from 'jquery-bridget';
import * as Isotope from 'isotope-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from 'src/app/Service/user-data.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  itemsObservable: Observable<portfolioData[]>;
  categoriesObservable: Observable<string[]>
  categories = [];

  constructor(private userDataService: UserDataService, private dialog: MatDialog) {
  }

  ngOnDestroy() {
    // this.itemsObservable
  }

  projectThumbnailName(project) {
    return `../../../assets/images/${project.category}.png`;
  }

  ngOnInit() {

    // Fetch Data of portfolio from api
    this.itemsObservable = this.userDataService.currentUpdatedUser.pipe(
      map( (data: user) => {
        this.categories = data.portfolio.map( item => item.category);
        return data.portfolio;
      })
    );

    // Fetch Data of categories from api
    this.categoriesObservable = this.userDataService.currentUpdatedUser.pipe(
      map( (data: user) => {
        return this.categories = data.portfolio.map( item => item.category);
      })
    );

    // JQuery
    this.jqueryInitialize();
  }

  filter(event: any) {
    console.log(event.target)
    const item = event.target;
    $('.portfolio-menu ul li').removeClass('active');
    item.classList.add("active");
    console.log('Heelo', item.getAttribute("data-filter"))
    const selector = item.getAttribute("data-filter");
    $('.portfolio-item').isotope({
      filter: selector
    });
  }

  // Initialize Isotope with jquery
  jqueryInitialize() {

    // Bridging between Isotope.js and Jquery.js
    jQueryBridget( 'isotope', Isotope, $ );
    $('.portfolio-item').isotope({
      itemSelector: '.item',
      layoutMode: 'fitRows'
    });

  }

  // Open Modal box when project is clicked on
  openDialog(project: portfolioData) {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.autoFocus = false;
    dialogConfig.data = project;

    this.dialog.open(ProjectDialogComponent, dialogConfig);
  }
}
