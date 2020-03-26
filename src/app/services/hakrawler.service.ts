import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hakrawler } from '../models/hakrawler.model';

@Injectable({
  providedIn: 'root'
})
export class HakrawlerService {

  readonly hakrawlerUrl = Environment.apiUrl + '/Hakrawler/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.hakrawlerUrl+id);
  }

  executeHakrawler(hakrawler: Hakrawler){
    let params = JSON.stringify(hakrawler);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.hakrawlerUrl, params, {headers:headers});
  }

}
