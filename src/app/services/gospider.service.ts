import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoSpider } from '../models/gospider.model';

@Injectable({
  providedIn: 'root'
})
export class GospiderService {

  readonly gospiderUrl = Environment.apiUrl + '/GoSpider/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.gospiderUrl+id);
  }

  executeGoSpider(gospider: GoSpider){
    let params = JSON.stringify(gospider);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.gospiderUrl, params, {headers:headers});
  }


}
