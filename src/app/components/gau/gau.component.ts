import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GauService } from '../../services/gau.service';
import { Gau } from '../../models/gau.model';

@Component({
  selector: 'app-gau',
  templateUrl: './gau.component.html',
  styleUrls: ['./gau.component.scss']
})
export class GauComponent implements OnInit {

  public loading = false;
  public program: any;
  public gauFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _GauService: GauService
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
    
    this._GauService.getFiles(id).subscribe((resp:any)=>{

      this.gauFiles = resp.files;

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
  
  executeGau(file){
    this.loading = true;
    let id = this.program._id;
    let url = file.split('-')[1]
    
    let gau = new Gau(
      id,
      url,
      file
    );

    this._GauService.executeGau(gau).subscribe((resp: any) => {
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

}
