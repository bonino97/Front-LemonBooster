import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LinkfinderService } from '../../services/linkfinder.service';
import { Linkfinder } from '../../models/linkfinder.model';
import { ExecLinkfinder } from '../../models/exec-linkfinder.model';

@Component({
  selector: 'app-linkfinder',
  templateUrl: './linkfinder.component.html',
  styleUrls: ['./linkfinder.component.scss']
})

export class LinkfinderComponent implements OnInit {

  public program: any;
  public hakrawlerJsFiles: [];

  public jsLinks: any = [];

  public openJsFiles: boolean = false;


  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _LinkfinderService: LinkfinderService
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
    
    this._LinkfinderService.getFiles(id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.hakrawlerJsFiles = resp.files;
    });
  }

  viewJsFile(file){

    let id = this.program._id;

    let linkfinder = new Linkfinder(
      id,
      file
    );

    this._LinkfinderService.getJsLinks(linkfinder)
      .subscribe((resp:any) => {
        console.log(resp);
        this.jsLinks = resp.hakrawlerFile;
      });
    
    this.openJsFiles = true;
  }

  executeLinkfinder(link){
    let id = this.program._id;

    let execLinkfinder = new ExecLinkfinder (
      id,
      link
    );

    this._LinkfinderService.executeLinkfinder(execLinkfinder).subscribe((resp: any) => {
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
