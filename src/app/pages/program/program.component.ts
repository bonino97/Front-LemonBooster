import { Component, OnInit } from "@angular/core";
import { ProgramService } from '../../services/program/program.service';
import { Router } from '@angular/router';
import { Program } from 'src/app/models/program.model';
import Swal from 'sweetalert2';


@Component({
  selector: "app-program",
  templateUrl: "program.component.html",
  styleUrls: ["./program.component.scss"]
})
export class ProgramComponent implements OnInit {

  programs: Program[] = [];
  program: Program;

  constructor(
    public _ProgramService: ProgramService,
    public router: Router) {}

  ngOnInit() {
    this.getPrograms();
  }

  getProgram(id){
    this._ProgramService.getProgram(id)
      .subscribe((resp:any) => {
        
        this.program = resp.program;
        return this.program;
      });

  }


  getPrograms(){
    this._ProgramService.getPrograms()
      .subscribe((resp:any)=>{
        this.programs = resp.programs
      });
  }

  deleteProgram(id){

    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-simple',
        cancelButton: 'btn btn-danger btn-simple'
      },
      buttonsStyling: false
    })
    
    swal.fire({
      title: '<font color="white">¿Are you sure?</font>',
      html: '<font color="white">The program will be deleted</font>',
      icon: 'warning',
      background: '#1e1e2f',      
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: false
    }).then((result) => {
      if(result.value){
               
        this._ProgramService
        .deleteProgram(id)
          .subscribe((resp:any) => {
            console.log(resp);

            this._ProgramService.getPrograms()
              .subscribe((resp:any)=>{
                this.programs = resp.programs
                swal.fire({
                  title: '<font color="white">Deleted</font>',
                  html: '<font color="white">The program has been deleted</font>',
                  background: '#1e1e2f', 
                  icon: 'success'
                }); 
              });
              
          }, error => {
            console.log(error);
          });
      }
    });
  }
}
