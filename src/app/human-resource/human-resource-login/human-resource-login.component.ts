import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-login',
  templateUrl: './human-resource-login.component.html',
  styleUrls: ['./human-resource-login.component.css']
})
export class HumanResourceLoginComponent implements OnInit {

  public hrlogInForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public items: MenuItem[] = [];
  public notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true
  });

  constructor(private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: "/home" },
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

  // Login human resource using onsubmit function
  onSubmit(humanresource: HumanResource) {
    this.isLoading = true;
    // Human resource Login
    this.humanresourceService.hrLogin(humanresource).subscribe({
      next: (humanresourceData) => {
        this.notyf.success({
          message: 'Login Successful',
          duration: 5000,
          background: "#00c293"
        })
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
