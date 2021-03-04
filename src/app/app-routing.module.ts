import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './Service/auth-guard.guard';


const routes: Routes = [
  { path: '', loadChildren: './Modules/default/default.module#DefaultModule'},
  { path: 'settings', loadChildren: './Modules/settings/settings.module#SettingsModule', canActivate: [AuthGuardGuard] },
  { path: '', redirectTo: '/profile', pathMatch: 'full'},
  { path: '**', redirectTo: '/profile', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
