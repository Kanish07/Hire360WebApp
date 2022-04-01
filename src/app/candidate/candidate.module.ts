import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { CandidateJobViewComponent } from './candidate-job-view/candidate-job-view.component';

let candidateRoute: Routes = [
  {path: "login", component: CandidateLoginComponent},
  {path: "register", component: CandidateRegisterComponent},
  {path: "profile", component: CandidateDashboardComponent},
  {path: "job-search", component: CandidateJobViewComponent}
]

@NgModule({
  declarations: [
    CandidateDashboardComponent,
    CandidateLoginComponent,
    CandidateRegisterComponent,
    CandidateJobViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(candidateRoute),
    FormsModule, 
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CandidateModule { }
