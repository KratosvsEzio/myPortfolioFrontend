import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilepageComponent } from './Pages/profilepage/profilepage.component';
import { AboutpageComponent } from './Pages/aboutpage/aboutpage.component';
import { PortfoliopageComponent } from './Pages/portfoliopage/portfoliopage.component';
import { ContactpageComponent } from './Pages/contactpage/contactpage.component';
import { PermissionComponent } from './Components/permission/permission.component';
import { AuthGuardGuard } from './Service/auth-guard.guard';
import { UserService } from './Service/user.service';


const routes: Routes = [
  { path: 'home', component: ProfilepageComponent, },
  { path: 'profile', component: ProfilepageComponent, },
  { path: 'profile/alijinnah19', component: PermissionComponent},
  { path: 'portfolio', component: PortfoliopageComponent},
  { path: 'about', component: AboutpageComponent},
  { path: 'contact', component: ContactpageComponent},
  { path: 'settings', loadChildren: './Modules/settings/settings.module#SettingsModule', canActivate: [AuthGuardGuard]},
  { path: '', redirectTo: '/profile', pathMatch: 'full'},
  { path: '**', component: ProfilepageComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuardGuard, UserService]
})

export class AppRoutingModule { }
export const routingComponent = [
  ProfilepageComponent,
  AboutpageComponent,
  PortfoliopageComponent,
  ContactpageComponent,
  PermissionComponent
];
