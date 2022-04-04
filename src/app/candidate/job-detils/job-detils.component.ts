import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Job } from 'src/app/model/job';
import { CandidateService } from 'src/app/shared/candidate.service';

@Component({
  selector: 'app-job-detils',
  templateUrl: './job-detils.component.html',
  styleUrls: ['./job-detils.component.css']
})
export class JobDetilsComponent implements OnInit {

  items: MenuItem[] = [];
  jobId!: string;
  jobDetail!: Job;

  constructor(private route: Router, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Search Job', icon: 'pi pi-search', routerLink: "/candidate/job-search" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/candidate/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/candidate/login" }
    ];

    this.jobId = this.route.url.split('/').pop()!;

    this.getJobDetail()

  }

  getJobDetail(){
    this.candidateService.getJobDetailByJobId(this.jobId).subscribe({
      next: (data) => {
        this.jobDetail = data['data' as keyof Object] as unknown as Job;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
