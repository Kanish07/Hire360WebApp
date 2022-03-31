import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from "primeng/button"
import { ToastModule } from "primeng/toast"
import { DropdownModule } from "primeng/dropdown"
import { ConfirmationService, MessageService } from "primeng/api"

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ScrollPanelModule,
    MenuModule,
    ButtonModule,
    ToastModule,
    DropdownModule
  ],
  providers: [ ConfirmationService, MessageService]
})
export class PrimeModule { }
