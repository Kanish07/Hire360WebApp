import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css']
})
export class CandidateLoginComponent implements OnInit {

  logInForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  items: MenuItem[] = [];

  constructor(private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router, private candidateService:CandidateService) { }

  ngOnInit(): void {

    this.items = [
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/candidate/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/candidate/login" }
    ];

    this.primengConfig.ripple = true;

    this.logInForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })

    localStorage.clear()
  }

  get h() {
    return this.logInForm.controls;
  }

  onSubmit(candidate: Candidate) {
    this.isLoading = true;
    this.candidateService.candidateLogin(candidate).subscribe({
      next: (candidateData) => {
        this.isLoading = false;
        localStorage.setItem("id", candidateData.id)
        localStorage.setItem("token", candidateData.token)
        localStorage.setItem("name", candidateData.username)
        localStorage.setItem("role", candidateData.role.toString())
        this.router.navigate(['candidate/dashboard'], {replaceUrl: true})
      },
      error: (errorData) => {
        console.log(errorData);
        this.messageService.add({severity:'error', summary:'Login Failed', detail:errorData.error.message});
        this.isLoading = false;
        this.onReset()
      }
    })
  }

  onReset(){
    this.submitted = false;
    this.logInForm.reset()
  }

}
