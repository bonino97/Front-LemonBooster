import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { WaybackurlsService } from '../../services/waybackurls.service';
import { Waybackurls } from '../../models/waybackurls.model';


@Component({
  selector: 'app-waybackurls',
  templateUrl: './waybackurls.component.html',
  styleUrls: ['./waybackurls.component.scss']
})
export class WaybackurlsComponent implements OnInit {

  public loading = false;
  public program: any;
  public waybackurlsFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _WaybackurlsService: WaybackurlsService
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
    
    this._WaybackurlsService.getFiles(id).subscribe((resp:any)=>{

      this.waybackurlsFiles = resp.files;

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

  executeWaybackurls(file){
    this.loading = true;
    let id = this.program._id;
    let url = file.split('-')[1]
    
    let waybackurls = new Waybackurls(
      id,
      url,
      file
    );

    this._WaybackurlsService.executeWaybackurls(waybackurls).subscribe((resp: any) => {
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
