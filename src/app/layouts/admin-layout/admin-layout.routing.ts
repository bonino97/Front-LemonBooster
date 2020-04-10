import { Routes } from "@angular/router";

import { ProgramComponent } from "../../pages/program/program.component";
import { AddProgramComponent } from '../../pages/add-program/add-program.component';
import { ViewProgramComponent } from '../../pages/view-program/view-program.component';
import { EditProgramComponent } from 'src/app/pages/edit-program/edit-program.component';
import { FindomainComponent } from '../../pages/tools/findomain/findomain.component';
import { LinkfinderComponent } from '../../pages/tools/linkfinder/linkfinder.component';
import { ArjunComponent } from '../../pages/tools/arjun/arjun.component';
import { DirsearchComponent } from '../../pages/tools/dirsearch/dirsearch.component';
import { JsearchComponent } from '../../pages/tools/jsearch/jsearch.component';




export const AdminLayoutRoutes: Routes = [
  { path: "program", component: ProgramComponent },
  { path: "program/:id", component: ViewProgramComponent },
  { path: "add-program", component: AddProgramComponent },
  { path: "edit-program/:id", component: EditProgramComponent },

  //TOOLS 

  { path: "findomain", component: FindomainComponent },
  { path: "linkfinder", component: LinkfinderComponent },
  { path: "arjun", component: ArjunComponent },
  { path: "dirsearch", component: DirsearchComponent },
  { path: "jsearch", component: JsearchComponent }
];
