import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css']
})
export class CandidateRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  cities!: string[];
  experience!: string[];
  selectedCity!: string;
  selectedExperience!: string;
  items: MenuItem[] = [];
  logo!: string;


  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder,
    private candidateService: CandidateService, private messageService: MessageService,
    private route: Router
  ) {
    this.cities = ["Coimbatore", "Bengaluru", "Chennai"];
    this.experience = ["Fresher", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years", "8 Years", "9 Years", "10+ Years"]
  }

  ngOnInit(): void {

    this.items = [
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/candidate/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/candidate/login" }
    ];

    this.primengConfig.ripple = true;
    this.registerForm = this.formBuilder.group({
      candidateName: ["", [Validators.required]],
      candidateEmail: ["", [Validators.required]],
      candidatePassword: ["", [Validators.required, Validators.minLength(6)]],
      candidateTotalExp: [this.selectedExperience, [Validators.required]],
      candidatePhoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      candidateCity: [this.selectedCity, [Validators.required]]
    })

    localStorage.clear()
  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit(candidate:Candidate){
    this.isLoading = true;
    this.candidateService.candidateRegistration(candidate).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({severity:'success', summary:'Registered Successfully', detail:""});
        this.onReset()
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Registration Failed', detail:error.error.message});
        this.isLoading = false;
        this.onReset()
      }
    })
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset()
  }

}
