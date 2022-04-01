import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from "primeng/button"
import { ToastModule } from "primeng/toast"
import { DropdownModule } from "primeng/dropdown"
import { ConfirmationService, MessageService } from "primeng/api"
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ScrollPanelModule,
    MenuModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ChipModule,
    ConfirmDialogModule,
    DialogModule,
    KnobModule
  ],
  providers: [ ConfirmationService, MessageService]
})
export class PrimeModule { }
