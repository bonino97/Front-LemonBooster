import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DirsearchService } from '../../services/dirsearch.service';
import { Dirsearch } from '../../models/dirsearch.model';
import { ExecDirsearch } from 'src/app/models/exec-dirsearch.model';


@Component({
  selector: 'app-dirsearch',
  templateUrl: './dirsearch.component.html',
  styleUrls: ['./dirsearch.component.scss']
})
export class DirsearchComponent implements OnInit {
  public loading = false;
  public program: any;
  public hakcheckurlFiles: [];
  public dirsearchLists: any = [] ;
  public subdomainsData: any = [] ;
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
  public openSubdomainCard: boolean = false;

  public selectList: any;
  public viewSelectList: any;
  public searchText: any;

  constructor(
    private _ProgramService: ProgramService,
    private _route: ActivatedRoute,
    private _DirsearchService: DirsearchService
  ) { }

  ngOnInit() {
    this.loadProgram();
    this.loadLists();

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
    
    this._DirsearchService.getFiles(id).subscribe((resp:any)=>{
      
      this.hakcheckurlFiles = resp.files;
      
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

  loadLists(){
    this._DirsearchService.getLists().subscribe((resp:any)=>{
      
      console.log(resp);

      this.dirsearchLists = resp.listsArray;
    });
  }

  viewSubdomains(file){

    this.subdomain200 = [];
    this.subdomain403 = [];
    this.subdomain400 = [];
    this.subdomain500 = [];
    this.subdomainOthers = [];

    let id = this.program._id;

    let dirsearch = new Dirsearch(
      id,
      file
    );

    this._DirsearchService.getFileData(dirsearch)
      .subscribe((resp:any) => {
        this.loadSubdomainsData(resp.hakchekurlFile)
    });    

    this.openSubdomainCard = true;
  }

  loadSubdomainsData(subdomainsData: []){
    
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

  executeDirsearch(subdomain){
    this.loading = true;
    let id = this.program._id;
    let list = this.captureList();

    let execDirsearch = new ExecDirsearch (
      id,
      subdomain,
      list
    );

    this._DirsearchService.executeDirsearch(execDirsearch).subscribe((resp: any) => {
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

  captureList(){
    this.viewSelectList = this.selectList;
    return this.viewSelectList;
  }

  searchValue(event){

    const inputValue = event.target.value;

    console.log(inputValue);
  }

}
