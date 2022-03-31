import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HumanResourceDashboardComponent } from './human-resource-dashboard/human-resource-dashboard.component';

let humanResourceRoute: Routes = [
  {path: "humanresourcedashoard", component: HumanResourceDashboardComponent}
]

@NgModule({
  declarations: [
    HumanResourceDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(humanResourceRoute)
  ]
})
export class HumanResourceModule { }
