import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { NgNavbarResponsiveModule } from 'ng-navbar-responsive';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    NgNavbarResponsiveModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    PrimeModule,
    MenuComponent
  ]
})
export class SharedModule { }
