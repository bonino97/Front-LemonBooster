import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { ComponentsModule } from '../../components/components.module';


import { AdminLayoutRoutes } from "./admin-layout.routing";
import { ProgramComponent } from "../../pages/program/program.component";
import { AddProgramComponent } from '../../pages/add-program/add-program.component';
import { EditProgramComponent } from '../../pages/edit-program/edit-program.component';

//TOOLS

import { FindomainComponent } from '../../pages/tools/findomain/findomain.component';
import { ArjunComponent } from '../../pages/tools/arjun/arjun.component';
import { DirsearchComponent } from '../../pages/tools/dirsearch/dirsearch.component';
import { LinkfinderComponent } from '../../pages/tools/linkfinder/linkfinder.component';


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";







@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProgramComponent,
    AddProgramComponent,
    EditProgramComponent,
    FindomainComponent,
    ArjunComponent,
    DirsearchComponent,
    LinkfinderComponent
  ]
})
export class AdminLayoutModule {}
