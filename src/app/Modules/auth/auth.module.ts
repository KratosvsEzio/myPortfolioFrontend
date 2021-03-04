import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
