import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  baseUrl:string = "https://api.dsp4-5archio19-ah-je-gh-yb.fr/"

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '**')
  .set('Access-Control-Allow-Headers', '*')
  .set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');


 
  getLots(): Observable<any>{
    
    const url = this.httpClient.get(
      this.baseUrl + 'lots', {'headers' : this.headers 
    });
    return url
  }

  
}

