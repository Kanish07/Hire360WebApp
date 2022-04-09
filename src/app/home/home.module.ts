import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgFooterModule } from 'ng-footer';

let homeRoute: Routes = [
  {path: "", component: LandingPageComponent}
]

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoute),
    NgFooterModule
  ]
})
export class HomeModule { }
