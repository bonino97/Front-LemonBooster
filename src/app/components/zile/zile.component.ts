import { Component, OnInit } from '@angular/core';
import { ZileService } from '../../services/zile.service';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from 'src/app/services/program/program.service';
import { Zile } from '../../models/zile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zile',
  templateUrl: './zile.component.html',
  styleUrls: ['./zile.component.scss']
})
export class ZileComponent implements OnInit {

  public program: any;
  public hakrawlerFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _ZileService: ZileService
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
    
    this._ZileService.getFiles(id).subscribe((resp:any)=>{
      this.hakrawlerFiles = resp.files;
    }, error => {

      console.log(error)

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

  executeZile(file){
    
    let id = this.program._id;
    let url = file.split('-')[1]
    
    let zile = new Zile(
      id,
      file
    );

    this._ZileService.executeZile(zile).subscribe((resp: any) => {
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
