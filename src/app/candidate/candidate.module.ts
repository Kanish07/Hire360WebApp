import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';

let candidateRoute: Routes = [
  {path: "login", component: CandidateLoginComponent},
  {path: "register", component: CandidateRegisterComponent},
  {path: "dashboard", component: CandidateDashboardComponent}
]

@NgModule({
  declarations: [
    CandidateDashboardComponent,
    CandidateLoginComponent,
    CandidateRegisterComponent
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
