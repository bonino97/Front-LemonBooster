import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Zile } from '../models/zile.model';

@Injectable({
  providedIn: 'root'
})
export class ZileService {

  readonly zileUrl = Environment.apiUrl + '/Zile/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id: any) {
    return this.http.get(this.zileUrl+id);
  }
  
  executeZile(zile: Zile){
    let params = JSON.stringify(zile);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.zileUrl, params, {headers:headers});
  }

  
}
