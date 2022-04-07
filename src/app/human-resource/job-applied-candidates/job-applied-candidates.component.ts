import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { process } from "@progress/kendo-data-query";
import { MenuItem } from 'primeng/api';
import { Job } from 'src/app/model/job';
import { JobAddByHr } from 'src/app/model/jobaddbyhr';
import { JobAppliedByJobId } from 'src/app/model/jobappliedbyjobid';
import { CandidateService } from 'src/app/shared/candidate.service';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-job-applied-candidates',
  templateUrl: './job-applied-candidates.component.html',
  styleUrls: ['./job-applied-candidates.component.css']
})
export class JobAppliedCandidatesComponent implements OnInit {

  public jobAppliedByJobId: JobAppliedByJobId[] = [];
  public jobAddByHr: JobAddByHr[] = [];
  public jobDetail!: Job;
  public gridView!: JobAppliedByJobId[];
  public jobId!: string;
  public hrid!: string;
  isLoadingJobApplied: boolean = true;
  isLoadingJobDetails: boolean = true;
  items: MenuItem[] = [];

  public labelContent(e: any): string {
    return e.category;
  }
  constructor(private humanresourceService: HumanResourceService, private route: Router, private candidateService: CandidateService) { }

  public mySelection: string[] = [];

  ngOnInit(): void {

    this.hrid = localStorage.getItem('id') as string;
    this.jobId = this.route.url.split('/').pop()!;
    this.humanresourceService.getJobAppliedByJobId(this.jobId).subscribe({
      next: (data) => {
        this.isLoadingJobApplied = false;
        if (data['data' as keyof Object].length != 0) {
          this.jobAppliedByJobId = data['data' as keyof Object] as unknown as JobAppliedByJobId[]
        }
        this.gridView = this.jobAppliedByJobId;
      },
      error: (err) => {
        this.isLoadingJobApplied = false;
        console.log(err);
      }
    })

    this.candidateService.getJobDetailByJobId(this.jobId).subscribe({
      next: (data) => {
        this.isLoadingJobDetails = false;
        this.jobDetail = data['data' as keyof Object] as unknown as Job;
      },
      error: (error) => {
        this.isLoadingJobDetails = false;
        console.error(error);
      }
    })

    this.items = [
      // { label: 'Candidate', icon: 'pi pi-sign-out', routerLink: "/humanresource/jobappliedcandidates/:id"},
      { label: 'My Job', icon: 'pi pi-fw pi-home', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login" }
    ];

  }

  public onFilter(e: Event): void {
    var inputValue = e.target as HTMLInputElement
    this.gridView = process(this.jobAppliedByJobId, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "candidate.candidateName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "candidate.candidateEmail",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "candidate.candidatePhoneNumber",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;
  }

}
