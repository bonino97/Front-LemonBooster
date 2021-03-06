import { Component, OnInit } from "@angular/core";
import { Findomain } from '../../models/findomain.model';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/services/program/program.service';
import { FindomainService } from '../../services/findomain.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-findomain",
  templateUrl: "findomain.component.html",
  styleUrls: ["findomain.component.scss"]
})
export class FindomainComponent implements OnInit {
  
  public loading = false;
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

    this.loading = true;
    
    let id = this.program._id;

    let findomain = new Findomain(
      scope,
      id
    );
    
    this._FindomainService.executeFindomain(findomain).subscribe((resp:any)=>{
      console.log(resp);

      this.loading = false;

      if(resp.ok){
        Swal.fire({
          title: '<font color="white">Success</font>',
          html: '<font color="white">'+ resp.message +'</font>',
          background: '#1e1e2f', 
          icon: 'success'
        });  
      } else {
        Swal.fire({
          title: '<font color="white">Error</font>',
          html: '<font color="white">'+ resp.message +'</font>',
          background: '#1e1e2f', 
          icon: 'error'
        });  
      }

    });
  }

  loadScope(scope){
    
    this.scopeToArray = scope.split(',');

    return this.scopeToArray; 

  }

}
