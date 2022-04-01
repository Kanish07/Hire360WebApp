import { Component, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() items!: MenuItem[];

  name!: string;

  Active: string = "true";

  public menuss = faBars as IconProp

  public navbarCollapsed = true;

  constructor() { }


  ngOnInit(): void {
    this.name = localStorage.getItem('name') as string;
  }

}
