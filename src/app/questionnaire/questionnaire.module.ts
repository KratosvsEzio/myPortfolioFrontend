import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { UtilityComponent } from './utility/utility.component';
import { QuestionLayoutComponent } from './question-layout/question-layout.component';
import { QuestionnaireComponent } from './questionnaire.component';
import { ExamDirectionsComponent } from './exam-directions/exam-directions.component';
import { ExamOptionsComponent } from './exam-options/exam-options.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { Style1Component } from './question-layout/style1/style1.component';
import { Style2Component } from './question-layout/style2/style2.component';
import { PauseTimeComponent } from './pause-time/pause-time.component';
import { HelpComponent } from './help/help.component';
import { LoadingComponent } from './loading/loading.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: QuestionnaireComponent,
    children: [
      { path: 'examDirections', component: ExamDirectionsComponent},
      { path: 'examOptions', component: ExamOptionsComponent},
      { path: 'questions/:id', component: QuestionLayoutComponent},
      { path: 'review', component: ReviewComponent},
      // { path: 'questions', children: [
      //   // { path: '', component: QuestionLayoutComponent},
      //   { path: '/:id', component: QuestionLayoutComponent},
      // ]},
      // { path: 'questions', loadChildren: './question-layout/question-layout.module#QuestionLayoutModule'},
      { path: '', redirectTo: 'examDirections', pathMatch: 'full'},
    ]
  },
  { path: 'help', component: HelpComponent},
];

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    UtilityComponent,
    QuestionLayoutComponent,
    QuestionnaireComponent,
    ExamDirectionsComponent,
    ExamOptionsComponent,
    ExitComponentComponent,
    Style1Component,
    Style2Component,
    HelpComponent,
    PauseTimeComponent,
    LoadingComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuestionnaireModule { }
