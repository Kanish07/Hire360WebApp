import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { CandidateJobViewComponent } from './candidate-job-view/candidate-job-view.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { JobDetailsComponent } from './job-details/job-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgFooterModule } from 'ng-footer';
import { AuthGuard } from '../shared/auth.guard';


let candidateRoute: Routes = [
  {path: "login", component: CandidateLoginComponent},
  {path: "register", component: CandidateRegisterComponent},
  {path: "profile", component: CandidateDashboardComponent, canActivate: [AuthGuard]},
  {path: "job-search", component: CandidateJobViewComponent, canActivate: [AuthGuard]},
  {path: "job-detail/:id", component: JobDetailsComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    CandidateDashboardComponent,
    CandidateLoginComponent,
    CandidateRegisterComponent,
    CandidateJobViewComponent,
    JobDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(candidateRoute),
    FormsModule,
    NgxGaugeModule,
    Ng2SearchPipeModule,
    NgFooterModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CandidateModule { }
