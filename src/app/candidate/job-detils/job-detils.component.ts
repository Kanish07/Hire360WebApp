import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Job } from 'src/app/model/job';
import { CandidateService } from 'src/app/shared/candidate.service';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-job-detils',
  templateUrl: './job-detils.component.html',
  styleUrls: ['./job-detils.component.css']
})
export class JobDetilsComponent implements OnInit {

  items: MenuItem[] = [];
  jobId!: string;
  candidateId!: string;
  jobDetail!: Job;
  totalApplications!: number;
  jobAlreadyApplied!: string;

  constructor(private route: Router, private candidateService: CandidateService, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Search Job', icon: 'pi pi-search', routerLink: "/candidate/job-search" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/candidate/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/candidate/login" }
    ];

    this.candidateId = localStorage.getItem('id') as string;

    this.jobId = this.route.url.split('/').pop()!;

    this.getJobDetail()

    this.getJobAppliedByJobId()

  }

  getJobDetail(){
    this.candidateService.GetJobByIdCheckIfAlreadyApplied(this.jobId, this.candidateId).subscribe({
      next: (data) => {
        this.jobDetail = data['data' as keyof Object]['job' as keyof Object] as unknown as Job;
        this.jobAlreadyApplied = data['data' as keyof Object]['isApplied' as keyof Object] as unknown as string;
        console.log(this.jobDetail);
        console.log(this.jobAlreadyApplied);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getJobAppliedByJobId(){
    this.humanresourceService.getJobAppliedByJobId(this.jobId).subscribe({
      next: (data) => {
        this.totalApplications = data['data' as keyof Object].length;
        console.log(this.totalApplications);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
