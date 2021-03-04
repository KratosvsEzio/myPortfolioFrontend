// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatChipsModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

// Components
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'skills/:pageNumber', component: SkillsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'about', component: AboutComponent },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    SkillsComponent,
    EducationComponent,
    PortfolioComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatChipsModule,
      MatIconModule
    ],
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SettingsModule { }
