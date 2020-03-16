import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Httprobe } from '../models/httprobe.model';

@Injectable({
  providedIn: 'root'
})
export class HttprobeService {

  readonly httprobeUrl = Environment.apiUrl + '/Httprobe/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.httprobeUrl+id);
  }

  executeHttprobe(httprobe: Httprobe):Observable<any>{

    let params = JSON.stringify(httprobe);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.httprobeUrl, params, {headers:headers});
    
  }

}
