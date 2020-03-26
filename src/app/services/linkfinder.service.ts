import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Linkfinder } from '../models/linkfinder.model';
import { ExecLinkfinder } from '../models/exec-linkfinder.model';

@Injectable({
  providedIn: 'root'
})
export class LinkfinderService {

  readonly linkfinderUrl = Environment.apiUrl + '/Linkfinder/';
  readonly linkfinderDataUrl = this.linkfinderUrl + '/Links/'

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.linkfinderUrl+id);
  }

  getJsLinks(linkfinder: Linkfinder){
    let params = JSON.stringify(linkfinder);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(params);

    return this.http.post(this.linkfinderDataUrl, params, {headers:headers});
  }

  executeLinkfinder(linkfinder: ExecLinkfinder){
    let params = JSON.stringify(linkfinder);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(params);

    return this.http.post(this.linkfinderUrl, params, {headers:headers});
  }

}
