import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dirsearch } from '../models/dirsearch.model';
import { ExecDirsearch } from '../models/exec-dirsearch.model';

@Injectable({
  providedIn: 'root'
})
export class DirsearchService {


  readonly dirsearchUrl = Environment.apiUrl + '/Dirsearch/';
  readonly dirsearchDataUrl = Environment.apiUrl + '/Dirsearch/Status';
  readonly dirsearchLists = Environment.apiUrl + '/Dirsearch/Lists';
  readonly dirsearchSingle = Environment.apiUrl + '/Dirsearch/Single';


  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.dirsearchUrl+id);
  }


  getFileData(dirsearch: Dirsearch): Observable<any>{

    let params = JSON.stringify(dirsearch);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    console.log(params);

    return this.http.post(this.dirsearchDataUrl, params, {headers:headers});
  }

  getLists(){
    return this.http.get(this.dirsearchLists);
  }

  executeDirsearch(dirsearch: ExecDirsearch){
    let params = JSON.stringify(dirsearch);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.dirsearchUrl, params, {headers:headers});
  }

  executeSingleDirsearch(resp: any) {
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.post(this.dirsearchSingle, params, {headers:headers});
  }

  makeDirsearchSyntax(resp){
    let params = JSON.stringify(resp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.put(this.dirsearchSingle, params, {headers:headers});
  }

}

