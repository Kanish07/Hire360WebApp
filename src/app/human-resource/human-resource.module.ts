import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HumanResourceDashboardComponent } from './human-resource-dashboard/human-resource-dashboard.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { JobAppliedCandidatesComponent } from './job-applied-candidates/job-applied-candidates.component';
import { HumanResourceProfileComponent } from './human-resource-profile/human-resource-profile.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeModule } from '../shared/prime.module';
import { HumanResourceLoginComponent } from './human-resource-login/human-resource-login.component';
import { HumanResourceRegisterComponent } from './human-resource-register/human-resource-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridDataResult } from "@progress/kendo-angular-grid";
import { GridModule } from "@progress/kendo-angular-grid";


let humanResourceRoute: Routes = [
  { path: "dashboard", component: HumanResourceDashboardComponent },
  { path: "jobappliedcandidates", component: JobAppliedCandidatesComponent },
  { path: "profile", component: HumanResourceProfileComponent },
  { path: "login", component: HumanResourceLoginComponent },
  { path: "register", component: HumanResourceRegisterComponent }
]

@NgModule({
  declarations: [
    HumanResourceDashboardComponent,
    JobAppliedCandidatesComponent,
    HumanResourceProfileComponent,
    HumanResourceLoginComponent,
    HumanResourceRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(humanResourceRoute),
    ChartsModule,
    SharedModule,
    PrimeModule,
    FormsModule, 
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    GridModule
  ]
})
export class HumanResourceModule { }
