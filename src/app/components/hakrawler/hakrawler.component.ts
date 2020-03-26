import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HakrawlerService } from '../../services/hakrawler.service';
import { Hakrawler } from '../../models/hakrawler.model';


@Component({
  selector: 'app-hakrawler',
  templateUrl: './hakrawler.component.html',
  styleUrls: ['./hakrawler.component.scss']
})
export class HakrawlerComponent implements OnInit {

  public program: any;
  public hakrawlerFiles: [];

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _HakrawlerService: HakrawlerService
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
    
    this._HakrawlerService.getFiles(id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.hakrawlerFiles = resp.files;
    });
  }

  executeHakrawler(file){
    
    let id = this.program._id;
    let url = file.split('-')[1]
    
    let hakrawler = new Hakrawler(
      id,
      url,
      file
    );

    this._HakrawlerService.executeHakrawler(hakrawler).subscribe((resp: any) => {
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
