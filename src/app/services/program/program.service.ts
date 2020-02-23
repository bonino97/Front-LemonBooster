import { Injectable } from '@angular/core';
import { Program } from '../../models/program.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  readonly programUrl = Environment.apiUrl + '/Program';

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    
  }

  getProgram(id){
    var programIdUrl = this.programUrl+'/'+id;
    console.log(programIdUrl);
    return this.http.get(programIdUrl);
  }

  
  getPrograms(){
    return this.http.get(this.programUrl);
  }

  updateProgram(id:string, program: Program):Observable<any>{
    let params = JSON.stringify(program);
    var programIdUrl = this.programUrl+'/'+ id;
    let headers = new HttpHeaders().set('Content-Type','application/json'); 

    console.log(params);

    return this.http
    .put(programIdUrl, params, {headers: headers})
    .pipe(map((resp:any)=>{

      console.log(resp);

  }));
}

  deleteProgram(id: string){
    var deletedUrl = this.programUrl+'/'+id;

    return this.http.delete(deletedUrl);
  }

}
