import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import { AquatoneService } from '../../services/aquatone.service';
import { Aquatone } from '../../models/aquatone.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aquatone',
  templateUrl: './aquatone.component.html',
  styleUrls: ['./aquatone.component.scss']
})
export class AquatoneComponent implements OnInit {

  public program: any;
  public httprobeFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _AquatoneService: AquatoneService,
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
    
    this._AquatoneService.getFiles(id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.httprobeFiles = resp.httprobeFiles;
    });
  }

  executeAquatone(file){
    let id = this.program._id;

    let aquatone = new Aquatone(
      id,
      file
      );

      this._AquatoneService.executeAquatone(aquatone).subscribe((resp:any) => {
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

