import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HumanResourceDashboardComponent } from './human-resource-dashboard/human-resource-dashboard.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { JobAppliedCandidatesComponent } from './job-applied-candidates/job-applied-candidates.component';
import { HumanResourceProfileComponent } from './human-resource-profile/human-resource-profile.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeModule } from '../shared/prime.module';

let humanResourceRoute: Routes = [
  {path: "humanresourcedashoard", component: HumanResourceDashboardComponent},
  {path: "jobappliedcandidates", component: JobAppliedCandidatesComponent},
  {path: "humanresourceprofile", component: HumanResourceProfileComponent}
]

@NgModule({
  declarations: [
    HumanResourceDashboardComponent,
    JobAppliedCandidatesComponent,
    HumanResourceProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(humanResourceRoute),
    ChartsModule,
    SharedModule,
    PrimeModule
  ]
})
export class HumanResourceModule { }
