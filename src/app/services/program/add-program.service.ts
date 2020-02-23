import { Injectable } from '@angular/core';
import { Program } from '../../models/program.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddProgramService {

  program: Program;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  addProgram(program: Program){
    let programUrl = Environment.apiUrl + '/Program';
    let headers = new HttpHeaders().set('Content-Type','application/json'); 
    let params = JSON.stringify(program);


    console.log(params);
    return this.http
      .post(programUrl, params, {headers: headers})
      .pipe(map((resp:any)=>{

        console.log(resp);

    }));
  }

}
