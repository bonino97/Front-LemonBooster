import { Component, OnInit } from '@angular/core';
import { AddProgramService } from '../../services/program/add-program.service';
import { Program } from '../../models/program.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: []
})
export class AddProgramComponent implements OnInit {

  program: Program[] = [];
  form: FormGroup;

  constructor(
      public _AddProgramService: AddProgramService,
      public router: Router
        ) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      domain: new FormControl(null, Validators.required),
      scope: new FormControl(null)
    });

  }

  addProgram(){

    if(this.form.invalid){
      return ;
    }

    let program = new Program(
      this.form.value.name,
      this.form.value.domain,
      this.form.value.scope
    );
    
    if(this.form.valid){
      Swal.fire({
        title: '<font color="white">Success</font>',
        html: '<font color="white">' + this.form.value.name + ' program has been added</font>',
        background: '#1e1e2f', 
        icon: 'success'
      });  
      
      this._AddProgramService.addProgram(program)
      .subscribe( resp => {
        this.router.navigate(['/program']);
      });

    }
  }

}
