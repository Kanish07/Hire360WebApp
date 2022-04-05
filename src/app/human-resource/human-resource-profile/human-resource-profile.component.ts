import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HumanResource } from 'src/app/model/humanresource';
import { HumanResourceService } from 'src/app/shared/human-resource.service';

@Component({
  selector: 'app-human-resource-profile',
  templateUrl: './human-resource-profile.component.html',
  styleUrls: ['./human-resource-profile.component.css']
})
export class HumanResourceProfileComponent implements OnInit {

  public humanResource!: HumanResource;
  hrid!: string;
  items: MenuItem[] = [];
  constructor(private router: Router, private humanresourceService: HumanResourceService) { }

  ngOnInit(): void {
    this.hrid = localStorage.getItem('id') as string;
    this.getHumanResourceById();

    this.items = [
      {label: 'My Job',icon: 'pi pi-briefcase', routerLink: "/humanresource/dashboard"},
      { label: 'Profile', icon: 'pi pi-user', routerLink: "/humanresource/profile" },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: "/humanresource/logout" }
    ];
  }

  getHumanResourceById() {
    this.humanresourceService.getHumanResourceById(this.hrid).subscribe({
      next: (data) => {
        console.log(data);
        this.humanResource = data['data' as keyof Object] as unknown as HumanResource;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
