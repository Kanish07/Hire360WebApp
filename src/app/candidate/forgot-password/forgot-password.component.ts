import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Candidate } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public candidateForgotPasswordInForm!: FormGroup;
  public candidateVerifyForm!: FormGroup;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public display: boolean = false;
  public items: MenuItem[] = [];
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true
  });


  constructor(private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig,
    private messageService: MessageService, private router: Router, private candidateService: CandidateService) { }

  ngOnInit(): void {

    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: "/home" },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/candidate/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/candidate/login" }
    ];

    this.primengConfig.ripple = true;


    this.candidateForgotPasswordInForm = this.formBuilder.group({
      email: ["", [Validators.required]]
    })

    this.candidateVerifyForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      otp: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })

  }



  get h() {
    return this.candidateForgotPasswordInForm.controls;
  }

  get c() {
    return this.candidateVerifyForm.controls;
  }

  onSubmit() {
    this.display = true;
    this.isLoading = true;
    this.candidateService.changePassword(this.candidateVerifyForm.value).subscribe({
      next: (candidateData) => {
        this.notyf.success({
          message: 'Password Reset successful',
          duration: 5000,
          background: "#00c293"
        })
        this.display = false;
        this.isLoading = false;
        this.router.navigateByUrl('/candidate/login')
      },
      error: (errorData) => {
        console.log(errorData);
        this.messageService.add({severity:'error', summary:'Please Try Again'});
        this.isLoading = false;
      }
    })
  }

  showDialog(candidate: Candidate) {
    this.candidateVerifyForm.patchValue({"email": this.candidateForgotPasswordInForm.value['email']})
    this.isLoading = true;
    this.candidateService.sendOtp(candidate).subscribe({
      next: (candidateData) => {
        this.notyf.success({
          message: 'OTP Send Successful',
          duration: 5000,
          background: "#00c293"
        })
        this.display = true;
        this.isLoading = false;
      },
      error: (errorData) => {
        console.log(errorData);
        this.messageService.add({severity:'error', summary:'Account does not exist'});
        this.isLoading = false;
      }
    })
  }

}
