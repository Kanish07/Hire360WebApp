import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-login',
  templateUrl: './human-resource-login.component.html',
  styleUrls: ['./human-resource-login.component.css']
})
export class HumanResourceLoginComponent implements OnInit {
  
  hrlogInForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  items: MenuItem[] = [];
  constructor(private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/humanresource/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/humanresource/login" }
    ];

    this.primengConfig.ripple = true;

    this.hrlogInForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })

    localStorage.clear()
  }
  get h() {
    return this.hrlogInForm.controls;
  }

  onSubmit(humanresource: HumanResource) {
    this.isLoading = true;
    this.humanresourceService.hrLogin(humanresource).subscribe({
      next: (humanresourceData) => {
        this.isLoading = false;
        localStorage.setItem("id", humanresourceData.id)
        localStorage.setItem("token", humanresourceData.token)
        localStorage.setItem("name", humanresourceData.username)
        localStorage.setItem("role", humanresourceData.role.toString())
        this.router.navigate(['humanresource/dashboard'], { replaceUrl: true })
      },
      error: (errorData) => {
        console.log(errorData);
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: errorData.error.message });
        this.isLoading = false;
        this.onReset()
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.hrlogInForm.reset()
  }
}
