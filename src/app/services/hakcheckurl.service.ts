import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hakcheckurl } from '../models/hakcheckurl.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HakcheckurlService {

  readonly hakcheckUrl = Environment.apiUrl + '/Hakcheckurl/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.hakcheckUrl+id);
  }

  executeHakcheckurl(hakcheckurl:Hakcheckurl):Observable<any>{

    let params = JSON.stringify(hakcheckurl);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.hakcheckUrl, params, {headers:headers});
    
  }

}
