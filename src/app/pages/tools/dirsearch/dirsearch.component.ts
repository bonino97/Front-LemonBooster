import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DirsearchService } from '../../../services/dirsearch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dirsearch',
  templateUrl: './dirsearch.component.html',
  styleUrls: ['./dirsearch.component.scss']
})
export class DirsearchComponent implements OnInit {

  public form : FormGroup;
  public syntax: String;
  public dirsearchLists: any = [] ;
  public selectList: any;
  public viewSelectList: any;

  constructor( private _DirsearchService: DirsearchService) { }

  ngOnInit() {

    this.form = new FormGroup({

      url: new FormControl('', Validators.required),
      list: new FormControl(''),
      recursive: new FormControl(false),
      cookies: new FormControl(false),
      hostname: new FormControl(false),
      forceExtensions: new FormControl(false),
      followRedirect: new FormControl(false),
      excludeCheck: new FormControl(false),
      excludeStatus: new FormControl(''),
      threadCheck: new FormControl(false),
      threads: new FormControl(''),
      httpCheck: new FormControl(false),
      httpMethod: new FormControl('')

    });

    this.loadLists();

    this._DirsearchService.makeDirsearchSyntax(this.form.value)
    .subscribe((result: any) => {
      this.syntax = result;
    });

  }

  loadLists(){
    this._DirsearchService.getLists().subscribe((resp:any)=>{
      
      console.log(resp);

      this.dirsearchLists = resp.listsArray;
    });
  }

  captureList(){
    this.viewSelectList = this.selectList;
    return this.viewSelectList;
  }

  
  searchValue(event){

    if(event.target.value){

      this.form.valueChanges.subscribe( (resp) => {
        
        this._DirsearchService.makeDirsearchSyntax(resp)
        .subscribe((result: any) => {
          this.syntax = result;
        });

      })
    }

  }

  
  onExecute(){
    this._DirsearchService.executeSingleDirsearch(this.form.value)
      .subscribe((resp:any)=>{
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
      })
  }


}
