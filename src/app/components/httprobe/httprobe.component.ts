import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { HttprobeService } from 'src/app/services/httprobe.service';
import { ActivatedRoute } from '@angular/router';

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
    private _HttpService: HttprobeService,
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
    
    this._HttpService.getFiles(id).subscribe((resp:any)=>{
      this.subdomainsFiles = resp.subdomainFiles;
    });
  }

  executeHttprobe(file){
    console.log(file);
  }
}
