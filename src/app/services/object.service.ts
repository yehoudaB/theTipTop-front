import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private httpClient: HttpClient,
  ) { 
  }


  baseUrl:string = environment.baseUrl

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Content-Security-Policy', `frame-src 'self'; frame-ancestors 'self'; object-src 'none';",`);



 
  getObjects(endpoint: string): Observable<any>{
    
    const url = this.httpClient.get(
      this.baseUrl + endpoint, {'headers' : this.headers 
    });
    return url
  }
}
