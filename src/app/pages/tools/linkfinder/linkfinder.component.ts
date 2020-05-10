import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LinkfinderService } from '../../../services/linkfinder.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-linkfinder',
  templateUrl: './linkfinder.component.html',
  styleUrls: ['./linkfinder.component.scss']
})
export class LinkfinderComponent implements OnInit {

  public form : FormGroup;
  public syntax: String;

  constructor(
    private _LinkFinderService: LinkfinderService
  ) { }

  ngOnInit() {

    
    
    this.form = new FormGroup({

      url: new FormControl('', Validators.required),
      domain: new FormControl(false),
      cookies: new FormControl(false),

    });
    
    this._LinkFinderService.makeLinkFinderSyntax(this.form.value)
      .subscribe((result:any)=>{
        this.syntax = result;
      })

  }

  searchValue(event){

    if(event.target.value){

      this.form.valueChanges.subscribe( (resp) => {
        
        this._LinkFinderService.makeLinkFinderSyntax(resp)
            .subscribe((result: any) => {
              this.syntax = result;
            });
      })
    }

  }

  onExecute(){
    this._LinkFinderService.executeSingleLinkFinder(this.form.value)
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
