import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsearchService {


  readonly jsearchUrl = Environment.apiUrl + '/JSearch/';
  readonly jsearchSingleUrl = this.jsearchUrl + 'Single/';


  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  makeJSearchSyntax(resp: any) {
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(this.jsearchSingleUrl, params, {headers:headers});
  }

  executeSingleJSearch(resp: any) {
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(this.jsearchSingleUrl, params, {headers:headers});
  }

}
