import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { HttprobeService } from 'src/app/services/httprobe.service';
import { ActivatedRoute } from '@angular/router';
import { Httprobe } from 'src/app/models/httprobe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-httprobe',
  templateUrl: './httprobe.component.html',
  styleUrls: ['./httprobe.component.scss']
})
export class HttprobeComponent implements OnInit {

  public program: any;
  public subdomainsFiles: [];

  
  constructor(
    private _ProgramService: ProgramService,
    private _HttprobeService: HttprobeService,
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
    
    this._HttprobeService.getFiles(id).subscribe((resp:any)=>{
      this.subdomainsFiles = resp.subdomainFiles;
    });
  }

  executeHttprobe(file){
    let id = this.program._id;

    let httprobe = new Httprobe(
      id,
      file
    );
    
    console.log(httprobe);

    this._HttprobeService.executeHttprobe(httprobe).subscribe((resp:any)=>{
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
