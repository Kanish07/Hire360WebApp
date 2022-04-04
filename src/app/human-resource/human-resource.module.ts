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
import { ExcelModule, GridDataResult, PDFModule } from "@progress/kendo-angular-grid";
import { GridModule } from "@progress/kendo-angular-grid";
import { HumanResourcePostJobComponent } from './human-resource-post-job/human-resource-post-job.component';


let humanResourceRoute: Routes = [
  { path: "dashboard", component: HumanResourceDashboardComponent },
  { path: "jobappliedcandidates/:id", component: JobAppliedCandidatesComponent },
  { path: "profile", component: HumanResourceProfileComponent },
  { path: "login", component: HumanResourceLoginComponent },
  { path: "register", component: HumanResourceRegisterComponent },
  { path: "postjob", component: HumanResourcePostJobComponent }
]

@NgModule({
  declarations: [
    HumanResourceDashboardComponent,
    JobAppliedCandidatesComponent,
    HumanResourceProfileComponent,
    HumanResourceLoginComponent,
    HumanResourceRegisterComponent,
    HumanResourcePostJobComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(humanResourceRoute),
    ChartsModule,
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    GridModule,
    ExcelModule,
    PDFModule
  ]
})
export class HumanResourceModule { }
