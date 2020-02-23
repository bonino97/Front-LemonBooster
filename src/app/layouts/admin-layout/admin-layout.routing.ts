import { Routes } from "@angular/router";

import { ProgramComponent } from "../../pages/program/program.component";
import { FindomainComponent } from "../../pages/findomain/findomain.component";
import { AddProgramComponent } from '../../pages/add-program/add-program.component';
import { ViewProgramComponent } from '../../pages/view-program/view-program.component';
import { EditProgramComponent } from 'src/app/pages/edit-program/edit-program.component';



export const AdminLayoutRoutes: Routes = [
  { path: "program", component: ProgramComponent },
  { path: "program/:id", component: ViewProgramComponent },
  { path: "add-program", component: AddProgramComponent },
  { path: "edit-program/:id", component: EditProgramComponent },
  { path: "findomain", component: FindomainComponent }  
];
