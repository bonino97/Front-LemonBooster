import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArjunService } from '../../../services/arjun.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arjun',
  templateUrl: './arjun.component.html',
  styleUrls: ['./arjun.component.scss']
})
export class ArjunComponent implements OnInit {

  private form : FormGroup;
  public syntax: String;

  constructor(
    private _ArjunService: ArjunService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({

      url: new FormControl('', Validators.required),
      method: new FormControl(''),
      stable: new FormControl(false),
      threadCheck: new FormControl(false),
      threads: new FormControl(''),

    });

  }

  searchValue(event){

    if(event.target.value){

      this.form.valueChanges.subscribe( (resp) => {
        this._ArjunService.makeArjunSyntax(resp)
        .subscribe((result: any) => {
          this.syntax = result;
        });
      })
    }
  }

  onExecute(){
    this._ArjunService.executeSingleArjun(this.form.value)
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
