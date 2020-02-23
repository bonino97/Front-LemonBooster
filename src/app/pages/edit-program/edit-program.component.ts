import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Program } from 'src/app/models/program.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styles: []
})
export class EditProgramComponent implements OnInit {

  program : any;
  form: FormGroup;

  constructor(
    public _ProgramService: ProgramService, 
    public _route : ActivatedRoute,
    public _router : Router
  ) { }

  ngOnInit() {
    
    this.loadProgram();

    this.form = new FormGroup({
      name: new FormControl(),
      domain: new FormControl(),
      scope: new FormControl()
    });
  }

  loadProgram(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProgram(id);
      console.log(id);
      return id;
    });
  }

  getProgram(id){
    this._ProgramService.getProgram(id)
      .subscribe((resp:any) => {
        
        this.program = resp.program;
        console.log(resp.program._id);
        return resp.program;
      });
  }

  updateProgram(){

    let id = this.program._id;
 
    if(this.form.invalid){
      console.log('Edit Form Invalid');
    }

    let program = new Program(
      this.form.value.name,
      this.form.value.domain,
      this.form.value.scope
    );

    if(program.name == null || program.domain == null ){
      program.name = this.program.name;
      program.domain = this.program.domain;
    }

    console.log(program);
    
    if(this.form.valid){
      Swal.fire({
        title: '<font color="white">Updated</font>',
        html: '<font color="white">' + this.form.value.name + ' program has been updated</font>',
        background: '#1e1e2f', 
        icon: 'success'
      });  
      
      this._ProgramService.updateProgram(id, program)
            .subscribe((resp:any) => {
              console.log(resp)
              this._router.navigate(['/program', id]);
            });

    }
  }

}
