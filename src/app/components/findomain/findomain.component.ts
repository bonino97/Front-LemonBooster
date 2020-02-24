import { Component, OnInit } from "@angular/core";
import { Findomain } from '../../models/findomain.model';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/services/program/program.service';
import { FindomainService } from '../../services/findomain.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-findomain",
  templateUrl: "findomain.component.html",
  styleUrls: ["findomain.component.scss"]
})
export class FindomainComponent implements OnInit {
  
  public program: any;
  public scopeToArray = [];

  constructor(
    private _ProgramService: ProgramService,
    private _FindomainService: FindomainService,
    private _route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.loadProgram();
  }

  loadProgram(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProgram(id);
      return id;
    });
  }

  getProgram(id){
    this._ProgramService.getProgram(id).subscribe(
        (resp:any) =>{  
          this.program = resp.program;
          this.loadScope(this.program.scope)
          return this.program;
        });
  }

  executeFindomain(scope){

    let id = this.program._id;

    let findomain = new Findomain(
      scope,
      id
    );
    
    console.log(findomain);

    this._FindomainService.executeFindomain(findomain).subscribe((resp:any)=>{
      console.log(resp);
    });
  }

  loadScope(scope){
  
    

    this.scopeToArray = scope.split(',');

    return this.scopeToArray; 

  }

}
