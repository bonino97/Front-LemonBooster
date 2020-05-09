import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Gau } from '../models/gau.model';

@Injectable({
  providedIn: 'root'
})
export class GauService {

  readonly gauUrl = Environment.apiUrl + '/Gau/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.gauUrl+id);
  }

  executeGau(gau: Gau){
    let params = JSON.stringify(gau);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.gauUrl, params, {headers:headers});
  }

}
