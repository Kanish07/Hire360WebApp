import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { JobPosted } from 'src/app/model/jobposted';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-post-job',
  templateUrl: './human-resource-post-job.component.html',
  styleUrls: ['./human-resource-post-job.component.css']
})
export class HumanResourcePostJobComponent implements OnInit {
  registerForm!: FormGroup;
  hrid!: string;
  submitted: boolean = false;
  isLoading: boolean = false;
  cities!: string[];
  selectedCity!: string;
  items: MenuItem[] = [];
  logo!: string;

  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder,
    private messageService: MessageService, private route: Router, private humanresourceService: HumanResourceService) {
    this.cities = ["Coimbatore", "Bengaluru", "Chennai"];
  }

  ngOnInit(): void {
    this.hrid = localStorage.getItem('id') as string;
    this.primengConfig.ripple = true;
    this.registerForm = this.formBuilder.group({
      hrid:[this.hrid], 
      jobTitle: ["", [Validators.required]],
      noOfVacancy: ["", [Validators.required, Validators.pattern("^[0-9]{1,2}$")]],
      package: ["", [Validators.required, Validators.pattern("^[0-9]{1,6}$")]],
      jobDescription: ["", [Validators.required]],
      jobCity: [this.selectedCity, [Validators.required]]
    })

  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit(jobposted: JobPosted) {
    this.isLoading = true;
    this.humanresourceService.postAddnewjob(jobposted).subscribe({
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
