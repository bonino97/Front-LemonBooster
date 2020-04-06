import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program/program.service';
import { Program } from 'src/app/models/program.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: []
})



export class ViewProgramComponent implements OnInit {
  

  public program: Program;
  public openFindomain: boolean;
  public openHttprobe: boolean;
  public openAquatone: boolean;
  public openSubjack: boolean;
  public openHakcheckurl: boolean;
  public openDirsearch: boolean;
  public openHakrawler: boolean;
  public openLinkfinder: boolean;
  public openGetJs: boolean;

  constructor(
    public _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    
    ) {
      
    }

  ngOnInit() {
    this.loadProgram();
  }

  loadProgram(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProgram(id);
      this.getProgramScope(id);
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

  getProgramScope(id){
    this._ProgramService.getProgram(id).subscribe(
      (resp:any) =>{  
        this.program.scope = resp.program.scope;
        return this.program.scope;
      });
  }

  showComponent(expression){

    this.openFindomain = false;
    this.openHttprobe = false;
    this.openAquatone = false;
    this.openSubjack = false;
    this.openHakcheckurl = false;
    this.openDirsearch = false;
    this.openHakrawler = false;
    this.openLinkfinder = false;
    this.openGetJs = false;

    switch(expression){
      case 1: {
        this.openFindomain = true;
        break;
      }
      case 2: {
        this.openHttprobe = true;
        break;
      }
      case 3: {
        this.openAquatone = true;
        break;
      }
      case 4: {
        this.openSubjack = true;
        break;
      }
      case 5: {
        this.openHakcheckurl = true;
        break;
      }
      case 6: {
        this.openDirsearch = true;
        break;
      }
      case 7: {
        this.openHakrawler = true;
        break;
      }
      case 8: {
        this.openLinkfinder = true;
        break;
      }
      case 9: {
        this.openGetJs = true;
        break;
      }
    }
  }
}
