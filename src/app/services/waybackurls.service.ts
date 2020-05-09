import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Waybackurls } from '../models/waybackurls.model';

@Injectable({
  providedIn: 'root'
})
export class WaybackurlsService {

  readonly waybackurlsUrl = Environment.apiUrl + '/Waybackurls/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.waybackurlsUrl+id);
  }

  executeWaybackurls(waybackurls: Waybackurls){
    let params = JSON.stringify(waybackurls);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.waybackurlsUrl, params, {headers:headers});
  }
}
