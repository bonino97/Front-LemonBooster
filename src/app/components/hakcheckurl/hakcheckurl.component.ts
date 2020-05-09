import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HakcheckurlService } from '../../services/hakcheckurl.service';
import { Hakcheckurl } from '../../models/hakcheckurl.model';

@Component({
  selector: 'app-hakcheckurl',
  templateUrl: './hakcheckurl.component.html',
  styleUrls: ['./hakcheckurl.component.scss']
})
export class HakcheckurlComponent implements OnInit {

  public loading = false;
  public program: any;
  public httprobeFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _HakcheckurlService: HakcheckurlService,
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
    
    this._HakcheckurlService.getFiles(id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.httprobeFiles = resp.httprobeFiles;
    },error => {

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

  executeHakcheckurl(file){
    this.loading = true;
    let id = this.program._id;

    let hakcheckurl = new Hakcheckurl(
      id,
      file
      );

      this._HakcheckurlService.executeHakcheckurl(hakcheckurl).subscribe((resp:any) => {
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
