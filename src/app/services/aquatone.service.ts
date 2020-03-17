import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Aquatone } from '../models/aquatone.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AquatoneService {

  readonly aquatoneUrl = Environment.apiUrl + '/Aquatone/';

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFiles(id){
    return this.http.get(this.aquatoneUrl+id);
  }

  executeAquatone(aquatone:Aquatone):Observable<any>{

    let params = JSON.stringify(aquatone);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(params);
    return this.http.post(this.aquatoneUrl, params, {headers:headers});
    
  }

}
