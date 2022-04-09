import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { JobAddByHr } from 'src/app/model/jobaddbyhr';
import { JobPosted } from 'src/app/model/jobposted';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-dashboard',
  templateUrl: './human-resource-dashboard.component.html',
  styleUrls: ['./human-resource-dashboard.component.css']
})
export class HumanResourceDashboardComponent implements OnInit {
  
  public jobAddByHr: JobAddByHr[] = [];
  registerForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  isLoadingHr: boolean = true;
  cities!: string[];
  selectedCity!: string;
  display: boolean = false;
  items: MenuItem[] = [];
  hrid!: string;
  public autofit = true;
  notyf = new Notyf({
    duration:5000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true
  });


  public labelContent(e: any): string {
    return e.category;
  }
  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder,
    private messageService: MessageService, private router: Router, private humanresourceService: HumanResourceService) {
    this.cities = ["Coimbatore", "Bengaluru", "Chennai"];
  }

  public kendodata: any[] = [];
  ngOnInit(): void {
    this.hrid = localStorage.getItem('id') as string;
    this.hrid = localStorage.getItem('id') as string;
    this.primengConfig.ripple = true;
    this.registerForm = this.formBuilder.group({
      hrid: [this.hrid],
      jobTitle: ["", [Validators.required]],
      noOfVacancy: ["", [Validators.required]],
      package: ["", [Validators.required]],
      jobDescription: ["", [Validators.required]],
      jobCity: [this.selectedCity, [Validators.required]]
    })

    this.items = [
      { label: 'My Jobs', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login" }
    ];

    this.humanresourceService.getJobAddedByHrId(this.hrid).subscribe({
      next: (data) => {
        this.isLoadingHr = false;
        this.jobAddByHr = data['data' as keyof Object] as unknown as JobAddByHr[];
        this.jobAddByHr.forEach((s) => {
          this.kendodata.push({ "kind": s.jobTitle, "share": s.noOfVacancy })
        })
      },
      error: (err) => {
        this.isLoadingHr = false;
        console.log(err);
      }
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
        this.notyf.success({
          message: 'New Post Added Successfully',
          duration: 5000,
          background: "#00c293"
        })
        this.messageService.add({ severity: 'success', summary: 'New Post added Successfully', detail: "" });
        this.onReset()
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Post Job Failed', detail: error.error.message });
        this.isLoading = false;
        this.onReset()
      }
    })
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset()
  }

  viewJob(jobId: string) {
    this.router.navigate([`humanresource/jobappliedcandidates/${jobId}`]);
  }

  showDialog() {
    this.display = true;
  }
}


