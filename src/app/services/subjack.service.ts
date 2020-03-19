import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subjack } from '../models/subjack.model';

@Injectable({
  providedIn: 'root'
})
export class SubjackService {

  readonly subjackUrl = Environment.apiUrl + '/Subjack/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.subjackUrl+id);
  }

  executeSubjack(subjack: Subjack):Observable<any>{

    let params = JSON.stringify(subjack);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.subjackUrl, params, {headers:headers});
    
  }

}
