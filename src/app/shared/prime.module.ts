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
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table'; 

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
    KnobModule,
    InputNumberModule,
    TooltipModule,
    FileUploadModule,
    AccordionModule,
    DataViewModule,
    SkeletonModule,
    ProgressBarModule,
    InputTextareaModule,
    TableModule
  ],
  providers: [ ConfirmationService, MessageService]
})
export class PrimeModule { }
