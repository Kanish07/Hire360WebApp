import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-human-resource-dashboard',
  templateUrl: './human-resource-dashboard.component.html',
  styleUrls: ['./human-resource-dashboard.component.css']
})
export class HumanResourceDashboardComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: "/humanresource/humanresourcedashoard" }
    ];
  }
}


