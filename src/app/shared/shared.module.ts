import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { NgNavbarResponsiveModule } from 'ng-navbar-responsive';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    NavbarComponent,
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
  ]
})
export class SharedModule { }
