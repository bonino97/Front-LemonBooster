import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JsearchService } from '../../../services/jsearch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jsearch',
  templateUrl: './jsearch.component.html',
  styleUrls: ['./jsearch.component.scss']
})
export class JsearchComponent implements OnInit {

  private form : FormGroup;
  public syntax: String;

  constructor(
    private _JsearchService: JsearchService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({

      url: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)

    });

  }

  searchValue(event){

    if(event.target.value){

      this.form.valueChanges.subscribe( (resp) => {
        this._JsearchService.makeJSearchSyntax(resp)
        .subscribe((result: any) => {
          this.syntax = result;
        });
      })
    }
  }

    onExecute(){
    this._JsearchService.executeSingleJSearch(this.form.value)
    .subscribe((resp:any)=>{
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
