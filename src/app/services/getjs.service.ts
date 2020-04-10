import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetJs } from '../models/getjs.model';
import { ExecGetJs } from '../models/exec-getjs.model';

@Injectable({
  providedIn: 'root'
})
export class GetJsService {

  readonly getjsUrl = Environment.apiUrl + '/Getjs/';
  readonly getjsDataUrl = this.getjsUrl + 'Links/';
  readonly getjsSyntax = this.getjsUrl + 'Single/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.getjsUrl+id);
  }

  getJsLinks(getjs: GetJs){
    let params = JSON.stringify(getjs);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(params);

    return this.http.post(this.getjsDataUrl, params, {headers:headers});
  }

  executeGetJs(getjs: ExecGetJs){
    let params = JSON.stringify(getjs);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(params)

    return this.http.post(this.getjsUrl, params, {headers:headers});
  }

}
