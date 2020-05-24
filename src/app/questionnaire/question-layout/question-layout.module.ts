import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style1Component } from './style1/style1.component';
import { Style2Component } from './style2/style2.component';
import { QuestionLayoutComponent } from './question-layout.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', children: [
  //   { path: '', component: QuestionLayoutComponent},
  //   { path: '/:id', component: QuestionLayoutComponent},
  // ]},
];

@NgModule({
  declarations: [
    // QuestionLayoutComponent,
    // Style1Component,
    // Style2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    // QuestionLayoutComponent,
    // Style1Component,
    // Style2Component
  ]
})
export class QuestionLayoutModule { }
