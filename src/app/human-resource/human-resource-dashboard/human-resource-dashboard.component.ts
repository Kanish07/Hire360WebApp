import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  cities!: string[];
  selectedCity!: string;
  display: boolean = false;
  items: MenuItem[] = [];
  hrid!: string;
  public autofit = true;


  public labelContent(e: any): string {
    return e.category;
  }
  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder,
    private messageService: MessageService,private router: Router, private humanresourceService: HumanResourceService) { 
      this.cities = ["Coimbatore", "Bengaluru", "Chennai"];
    }

  public kendodata: any[] = [];
  ngOnInit(): void {
    this.hrid = localStorage.getItem('id') as string;
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
    
    this.items = [
      { label: 'My Jobs', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink:"/humanresource/profile"},
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login"}
    ];
    this.humanresourceService.getJobAddedByHrId(this.hrid).subscribe({
      next: (data) => {
        console.log(data['data' as keyof Object] as unknown as JobAddByHr);
        this.jobAddByHr = data['data' as keyof Object] as unknown as JobAddByHr[];
        // this.kendodata = data['data' as keyof Object] as unknown as JobAddByHr[];
        console.log(this.jobAddByHr);
        console.log(this.kendodata);
        
   

        this.jobAddByHr.forEach((s) => {
          this.kendodata.push({ "kind": s.jobTitle, "share": s.noOfVacancy })
        })
        console.log(this.jobAddByHr)
      },
      error: (err) => {
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

  viewJob(jobId: string) {
    this.router.navigate([`humanresource/jobappliedcandidates/${jobId}`]);
  }

  showDialog() {
    this.display = true;
}
}


