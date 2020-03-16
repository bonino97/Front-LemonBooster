import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { ViewProgramComponent } from '../pages/view-program/view-program.component';
import { FindomainComponent } from './findomain/findomain.component';
import { HttprobeComponent } from './httprobe/httprobe.component';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ViewProgramComponent,
    FindomainComponent,
    HttprobeComponent,
  ],
  exports: [
    ViewProgramComponent,
    FindomainComponent,
  ]
})
export class ComponentsModule { }
