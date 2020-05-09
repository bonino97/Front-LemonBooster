import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GospiderService } from '../../services/gospider.service';
import { GoSpider } from '../../models/gospider.model';


@Component({
  selector: 'app-gospider',
  templateUrl: './gospider.component.html',
  styleUrls: ['./gospider.component.scss']
})
export class GospiderComponent implements OnInit {

  public loading = false;
  public program: any;
  public gospiderFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _GoSpiderService: GospiderService
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
    
    this._GoSpiderService.getFiles(id).subscribe((resp:any)=>{

      this.gospiderFiles = resp.files;

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

  executeGoSpider(file){
    this.loading = true;
    let id = this.program._id;
    let url = file.split('-')[1]
    
    let gospider = new GoSpider(
      id,
      url,
      file
    );

    this._GoSpiderService.executeGoSpider(gospider).subscribe((resp: any) => {
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
