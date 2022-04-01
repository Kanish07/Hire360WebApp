import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-register',
  templateUrl: './human-resource-register.component.html',
  styleUrls: ['./human-resource-register.component.css']
})
export class HumanResourceRegisterComponent implements OnInit {

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
    private humanresourceService: HumanResourceService, private messageService: MessageService,
    private route: Router) {
    this.cities = ["Coimbatore", "Bengaluru", "Chennai"];
  }

  ngOnInit(): void {

    this.items = [
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: "/humanresource/register" },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: "/humanresource/login" }
    ];

    this.primengConfig.ripple = true;
    this.registerForm = this.formBuilder.group({
      hrname: ["", [Validators.required]],
      hremail: ["", [Validators.required]],
      hrpassword: ["", [Validators.required, Validators.minLength(6)]],
      hrphoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      companyName: ["",[Validators.required]],
      city: [this.selectedCity, [Validators.required]]
    })

    localStorage.clear()
  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit(humanresource: HumanResource) {
    this.isLoading = true;
    this.humanresourceService.hrRegistration(humanresource).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Registered Successfully', detail: "" });
        this.onReset()
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: error.error.message });
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
