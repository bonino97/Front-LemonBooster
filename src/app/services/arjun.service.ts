import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArjunService {

  readonly arjunUrl = Environment.apiUrl + '/Arjun/';
  readonly arjunSingleUrl = this.arjunUrl + 'Single/'


  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  makeArjunSyntax(resp){
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(this.arjunSingleUrl, params, {headers:headers});
  }

  executeSingleArjun(resp){
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(this.arjunSingleUrl, params, {headers:headers});
  }


}
