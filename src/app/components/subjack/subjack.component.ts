import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import { Subjack } from 'src/app/models/subjack.model';
import Swal from 'sweetalert2';
import { SubjackService } from '../../services/subjack.service';

@Component({
  selector: 'app-subjack',
  templateUrl: './subjack.component.html',
  styleUrls: ['./subjack.component.scss']
})
export class SubjackComponent implements OnInit {
  public loading = false;
  public program: any;
  public subdomainsFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _SubjackService: SubjackService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadProgram();
  }

  loadProgram(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProgram(id);
      this.loadFiles(id);
      return id;
    });
  }

  getProgram(id){
    this._ProgramService.getProgram(id).subscribe(
        (resp:any) =>{  
          this.program = resp.program;
          return this.program;
        });
  }

  loadFiles(id){
    
    this._SubjackService.getFiles(id).subscribe((resp:any)=>{
      this.subdomainsFiles = resp.subdomainFiles;
    }, error => {
      if(!error.error.ok){
        Swal.fire({
          title: '<font color="white">Error</font>',
          html: '<font color="white">'+ error.error.message +'</font>',
          background: '#1e1e2f', 
          icon: 'error'
        });
      }
    });
  }

  executeSubjack(file){
    this.loading = true;
    let id = this.program._id;

    let subjack = new Subjack(
      id,
      file
    );
    
    console.log(subjack);

    this._SubjackService.executeSubjack(subjack).subscribe((resp:any)=>{
      this.loading = false;
      console.log(resp);
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

}
