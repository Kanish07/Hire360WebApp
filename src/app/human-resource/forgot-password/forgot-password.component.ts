import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public hrforgotpasswordInForm!: FormGroup;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public items: MenuItem[] = [];
  
  constructor(private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig, 
    private messageService: MessageService, private router: Router, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {

    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: "/home" },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/humanresource/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/humanresource/login" }
    ];

    this.hrforgotpasswordInForm = this.formBuilder.group({
      email: ["", [Validators.required]]
        })
        
  }
  get h() {
    return this.hrforgotpasswordInForm.controls;
  }

  onSubmit(humanresource: HumanResource) {
    this.isLoading = true;
  }

}
