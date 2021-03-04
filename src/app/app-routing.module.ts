import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './Service/auth-guard.guard';


const routes: Routes = [
  { path: 'settings', loadChildren: './Modules/settings/settings.module#SettingsModule', canActivate: [AuthGuardGuard] },
  { path: '', loadChildren: './Modules/default/default.module#DefaultModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
