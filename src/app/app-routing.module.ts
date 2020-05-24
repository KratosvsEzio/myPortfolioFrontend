import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule'},
  { path: 'gre', loadChildren: './questionnaire/questionnaire.module#QuestionnaireModule'},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
