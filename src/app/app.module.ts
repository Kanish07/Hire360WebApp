import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { NgFooterModule } from 'ng-footer';



let appRoutes:Routes = [
  {path: "", loadChildren: () => import("./home/home.module").then((h) => h.HomeModule)},
  {path: "humanresource", loadChildren: () => import("./human-resource/human-resource.module").then((h) => h.HumanResourceModule)},
  {path: "candidate", loadChildren: () => import("./candidate/candidate.module").then((c) => c.CandidateModule)}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    NgbModule,
    GridModule,
    ExcelModule,
    PDFModule,
    NgFooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
