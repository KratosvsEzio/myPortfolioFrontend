import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  { path: 'home', component: IndexComponent,
    children: [
      // {path: ''}
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];


@NgModule({
  declarations: [
    IndexComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainModule { }
