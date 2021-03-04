
//  Components
import { DefaultComponent } from './default.component';
import { ProfilepageComponent } from 'src/app/Pages/profilepage/profilepage.component';
import { PortfoliopageComponent } from 'src/app/Pages/portfoliopage/portfoliopage.component';
import { PermissionComponent } from 'src/app/Components/permission/permission.component';
import { AboutpageComponent } from 'src/app/Pages/aboutpage/aboutpage.component';
import { ContactpageComponent } from 'src/app/Pages/contactpage/contactpage.component';
import { ProfileComponent } from 'src/app/Components/profile/profile.component';
import { AboutComponent } from 'src/app/Components/about/about.component';
import { EducationComponent } from 'src/app/Components/education/education.component';
import { PortfolioComponent } from 'src/app/Components/portfolio/portfolio.component';
import { ContactComponent } from 'src/app/Components/contact/contact.component';

// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: 'profile', component: ProfilepageComponent, },
      { path: 'login', component: PermissionComponent},
      { path: 'portfolio', component: PortfoliopageComponent},
      { path: 'about', component: AboutpageComponent},
      { path: 'contact', component: ContactpageComponent},
      { path: '', redirectTo: '/profile', pathMatch: 'full'},
      { path: '**', redirectTo: '/profile', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  declarations: [
    PortfoliopageComponent,
    AboutpageComponent,
    ContactpageComponent,
    DefaultComponent,
    ProfileComponent,
    AboutComponent,
    EducationComponent,
    PortfolioComponent,
    ContactComponent,
    ProfilepageComponent,
    PermissionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DefaultModule { }
