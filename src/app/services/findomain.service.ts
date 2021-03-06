import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Findomain } from '../models/findomain.model';



@Injectable({
  providedIn: 'root'
})
export class FindomainService {



  readonly findomainUrl = Environment.apiUrl + '/Findomain/';
  readonly singleFindomainUrl = `${this.findomainUrl}Single`

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  executeFindomain(findomain: Findomain):Observable<any>{

    let params = JSON.stringify(findomain);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.findomainUrl, params, {headers:headers});
    
  }

  executeSingleFindomain(resp: any) {
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(this.singleFindomainUrl, params, {headers:headers});
  }

  makeFindomainSyntax(resp: any) {
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(this.singleFindomainUrl, params, {headers:headers});
  }


}
