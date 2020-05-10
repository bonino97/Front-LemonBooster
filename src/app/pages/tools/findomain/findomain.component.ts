import { Component, OnInit } from '@angular/core';
import { FindomainService } from '../../../services/findomain.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-findomain',
  templateUrl: './findomain.component.html',
  styleUrls: ['./findomain.component.scss']
})
export class FindomainComponent implements OnInit {

  public form : FormGroup;
  public syntax: String;

  constructor(
    private _FindomainService: FindomainService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({

      url: new FormControl('', Validators.required),
      resolvable: new FormControl(false)
    });

    this._FindomainService.makeFindomainSyntax(this.form.value)
    .subscribe((result:any)=>{
      this.syntax = result;
    });

  }

  searchValue(event){

    if(event.target.value){

      this.form.valueChanges.subscribe( (resp) => {
        
        this._FindomainService.makeFindomainSyntax(resp)
            .subscribe((result: any) => {
              this.syntax = result;
            });
      })
    }

  }

  onExecute(){
    this._FindomainService.executeSingleFindomain(this.form.value)
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
