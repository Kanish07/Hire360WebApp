import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-register',
  templateUrl: './human-resource-register.component.html',
  styleUrls: ['./human-resource-register.component.css']
})
export class HumanResourceRegisterComponent implements OnInit {

  public submitted: boolean = false;
  public isLoading: boolean = false;
  public items: MenuItem[] = [];
  public cities!: string[];
  public experience!: string[];
  public registerForm!: FormGroup;
  public logo!: string;
  public selectedCity!: string;
  public selectedExperience!: string;
  public notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true
  });

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
      hrpassword: ["", [Validators.required]],
      hrphoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      companyName: ["", [Validators.required]],
      city: [this.selectedCity, [Validators.required]],
      jobDescription: ["", [Validators.required]]
    })
    localStorage.clear()
  }

  get h() {
    return this.registerForm.controls;
  }

  // Register new Human Resource using onSubmit function
  onSubmit(humanresource: HumanResource) {
    this.isLoading = true;
    // Human resource registration 
    this.humanresourceService.hrRegistration(humanresource).subscribe({
      next: () => {
        this.isLoading = false;
        this.notyf.success({
          message: 'Registered Successfully',
          duration: 5000,
          background: "#00c293"
        })
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
