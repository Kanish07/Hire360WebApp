import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { process } from "@progress/kendo-data-query";
import { MenuItem } from 'primeng/api';
import { JobAppliedByJobId } from 'src/app/model/jobappliedbyjobid';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-job-applied-candidates',
  templateUrl: './job-applied-candidates.component.html',
  styleUrls: ['./job-applied-candidates.component.css']
})
export class JobAppliedCandidatesComponent implements OnInit {

  public jobAppliedByJobId: JobAppliedByJobId[] = [];
  public gridView!: JobAppliedByJobId[];
  public jobId!: string;
  public hrid!: string;
  
  public data: any[] = [
    {
      kind: "Sales",
      share: 0.175,
    },
    {
      kind: "Developer",
      share: 0.238,
    },
    {
      kind: "Support",
      share: 0.118,
    },
    {
      kind: "QA",
      share: 0.052,
    },
    {
      kind: "SEO",
      share: 0.025,
    },
    {
      kind: "Other",
      share: 0.192,
    },
  ];
  items: MenuItem[] = [];
  public labelContent(e: any): string {
    return e.category;
  }
  constructor(private humanresourceService: HumanResourceService, private route: Router) { }

  public mySelection: string[] = [];

  ngOnInit(): void {
    
    this.hrid = localStorage.getItem('id') as string;
    this.jobId  = this.route.url.split('/').pop()!;
    this.humanresourceService.getJobAppliedByJobId(this.jobId).subscribe({
      next: (data) => {
        if(data['data' as keyof Object].length != 0){
          this.jobAppliedByJobId = data['data' as keyof Object] as unknown as JobAppliedByJobId[]
        }
        this.gridView = this.jobAppliedByJobId;
        console.log(this.gridView[0].candidate.candidateName);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.items = [
      { label: 'Candidate', icon: 'pi pi-sign-out', routerLink: "/humanresource/jobappliedcandidates/:id"},
      { label: 'My Job', icon: 'pi pi-fw pi-home', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink:"/humanresource/profile"},
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login"}
    ];
  }
// 
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
          // {
          //   field: "candidateTotalExp",
          //   operator: "contains",
          //   value: inputValue,
          // },
        ],
      },
    }).data;
  }

}
