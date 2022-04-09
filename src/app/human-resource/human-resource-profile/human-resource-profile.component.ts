import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { JobAddByHr } from 'src/app/model/jobaddbyhr';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-profile',
  templateUrl: './human-resource-profile.component.html',
  styleUrls: ['./human-resource-profile.component.css']
})
export class HumanResourceProfileComponent implements OnInit {

  public humanResource!: HumanResource;
  public hrid!: string;
  public isLoadingJob: boolean = true;
  public isLoadingHR: boolean = true;
  public items: MenuItem[] = [];
  public jobAddByHr: JobAddByHr[] = [];

  constructor(private router: Router, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {

    this.hrid = localStorage.getItem('id') as string;

    this.getHumanResourceById();

    this.items = [
      { label: 'My Job', icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard" },
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/login" }
    ];

    // Get job added by using Human Resource id
    this.humanresourceService.getJobAddedByHrId(this.hrid).subscribe({
      next: (data) => {
        this.isLoadingJob = false;
        this.jobAddByHr = data['data' as keyof Object] as unknown as JobAddByHr[];
      },
      error: (err) => {
        this.isLoadingJob = false;
        console.log(err);
      }
    })
  }

  // Get Human resource by using human resource id
  getHumanResourceById() {
    this.humanresourceService.getHumanResourceById(this.hrid).subscribe({
      next: (data) => {
        this.isLoadingHR = false;
        this.humanResource = data['data' as keyof Object] as unknown as HumanResource;
      },
      error: (err) => {
        this.isLoadingHR = false;
        console.log(err);
      }
    })
  }
}
