import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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

  items: MenuItem[] = [];
  hrid!: string;
  public autofit = true;

  public labelContent(e: any): string {
    return e.category;
  }
  constructor(private router: Router, private humanresourceService: HumanResourceService) { }

  public kendodata: any[] = [];
  ngOnInit(): void {
    this.hrid = localStorage.getItem('id') as string;

    // this.getAllJobPostedByHr();

    this.items = [
      { label: 'My Jobs', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login"},
      { label: 'Profile', icon: 'pi pi-user', routerLink:"/humanresource/profile"}
    ];
    this.humanresourceService.getJobAddedByHrId(this.hrid).subscribe({
      next: (data) => {
        console.log(data['data' as keyof Object] as unknown as JobAddByHr);
        this.jobAddByHr = data['data' as keyof Object] as unknown as JobAddByHr[];
        // this.kendodata = data['data' as keyof Object] as unknown as JobAddByHr[];
        console.log(this.jobAddByHr);
        console.log(this.kendodata);
        
        
        // console.log(this.jobAddByHr.length);

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

  viewJob(jobId: string) {
    this.router.navigate([`humanresource/jobappliedcandidates/${jobId}`]);
  }
}


