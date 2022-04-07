import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { MenuItem } from 'primeng/api';
import { Job } from 'src/app/model/job';
import { CandidateService } from 'src/app/shared/candidate.service';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  items: MenuItem[] = [];
  jobId!: string;
  candidateId!: string;
  jobDetail!: Job;
  totalApplications!: number;
  jobAlreadyApplied!: string;
  isLoading: boolean = true;
  isLoadingComp: boolean = true;
  isLoadingJobApply: boolean = false;
  count!: number;
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true
  });

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

    this.getAppliedJobsByCandidateIdCount()

  }


  //Trial for pro membership
  getAppliedJobsByCandidateIdCount() {
    //TODO: Hanlde Error
    this.candidateService.getAppliedJobsByCandidateId(this.candidateId).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.count = data['data' as keyof Object].length
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  getJobDetail() {
    this.isLoadingComp = true
    this.candidateService.GetJobByIdCheckIfAlreadyApplied(this.jobId, this.candidateId).subscribe({
      next: (data) => {
        this.isLoadingComp = false
        this.jobDetail = data['data' as keyof Object]['job' as keyof Object] as unknown as Job;
        this.jobAlreadyApplied = data['data' as keyof Object]['isApplied' as keyof Object] as unknown as string;
        console.log(this.jobDetail);
        console.log(this.jobAlreadyApplied);
      },
      error: (error) => {
        this.isLoadingComp = false
        console.error(error);
      }
    });
  }

  getJobAppliedByJobId() {
    this.humanresourceService.getJobAppliedByJobId(this.jobId).subscribe({
      next: (data) => {
        this.isLoading = false
        this.totalApplications = data['data' as keyof Object].length;
        console.log(this.totalApplications);
      },
      error: (error) => {
        this.isLoading = false
        console.error(error);
      }
    })
  }

  ApplyJob() {
    this.isLoadingJobApply = true;
    if (this.count >= 5) {
      this.notyf.error({
        message: 'Job limit reached please Upgrade you plan!',
        duration: 5000
      })
    } else {
      this.candidateService.applyJob(this.jobId, this.candidateId).subscribe({
        next: (data) => {
          this.isLoadingJobApply = false
          this.notyf.success({
            message: 'Job Applied',
            duration: 5000,
            background: "#00c293"
          })
          this.getJobDetail()
        },
        error: (error) => {
          this.isLoadingJobApply = false
          console.error(error);
          this.notyf.error({
            message: 'Job Apply Failed',
            duration: 5000
          })
        }
      });
    }
  }

}
