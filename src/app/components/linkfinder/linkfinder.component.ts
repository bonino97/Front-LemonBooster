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

  public subdomain200: any = [];
  public subdomain403: any = [];
  public subdomain400: any = [];
  public subdomain500: any = [];
  public subdomainOthers: any = [];

  public open200: boolean;
  public open403: boolean;
  public open400: boolean;
  public open500: boolean;
  public openOthers: boolean;
  public openTable: boolean;

  public allLinks: any = [];

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

  viewSubdomains(file){

    this.subdomain200 = [];
    this.subdomain403 = [];
    this.subdomain400 = [];
    this.subdomain500 = [];
    this.subdomainOthers = [];

    let id = this.program._id;

    let linkfinder = new Linkfinder(
      id,
      file
    );

    this._LinkfinderService.getJsLinks(linkfinder)
      .subscribe((resp:any) => {
        this.allLinks = resp.hakcheckurlFile;
        this.loadSubdomainsData(resp.hakcheckurlFile)

      });
    
    this.openJsFiles = true;
  }
  loadSubdomainsData(subdomainsData: []) {

    subdomainsData.forEach((data: Array<string>, i) => {
      let code = data.toString().substr(0,3).trim();
      let subdomain = data.toString().substr(3,data.length).trim();

      switch(code){
        case '200':{
          this.subdomain200.push(subdomain);
          break;
        } 
        case '403': {
          this.subdomain403.push(subdomain);
          break;
        }
        case '401': {
          this.subdomain403.push(subdomain);
          break;
        }
        case '400': {
          this.subdomain400.push(subdomain);
          break;
        }
        case '500': {
          this.subdomain500.push(subdomain);
          break;
        }
        default: {
          this.subdomainOthers.push(data);
          break;
        }
      }
    });

  }

  showSubdomains(expression){

    this.open200 = false;
    this.open403 = false;
    this.open400 = false;
    this.open500 = false;
    this.openOthers = false;
    this.openTable = true;
    
    switch(expression){
      case 1: {
        this.open200 = true;
        break;
      }
      case 2: {
        this.open403 = true;
        break;
      }
      case 3: {
        this.open400 = true;
        break;
      }
      case 4: {
        this.open500 = true;
        break;
      }
      case 5: {
        this.openOthers = true;
        break;
      }
    }
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

  searchValue(event){

    const inputValue = event.target.value;
    this.allLinks.filter(link => link.toLowerCase().includes(inputValue));
    console.log(this.allLinks.filter(link => link.toLowerCase().includes(inputValue)));
  }

}
