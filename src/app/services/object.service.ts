import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

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
  .set('charset', 'utf-8')
  .set('Content-Security-Policy', `frame-src 'self'; frame-ancestors 'self'; object-src 'none';",`);



 
  getObjects(endpoint: string): Observable<any>{
    const resp = this.httpClient.get(
      this.baseUrl + endpoint, {'headers' : this.headers 
    });
    return resp;
  }


  saveObject(endpoint: string, entity: Object): Observable<any>{
    const resp = this.httpClient.post(
      this.baseUrl + endpoint, entity,{'headers' : this.headers 
    }); 
    return resp;
  }

  saveObjects(objectsUrl: string, data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', charset: 'utf-8'});
    return this.httpClient.post(this.baseUrl + objectsUrl, data, {'headers' : this.headers , observe : 'response'});
  }

  getCurrentUser(email: string): Observable<User>{
     const resp = this.httpClient.get(
      this.baseUrl + 'users/'+ email, {'headers' : this.headers 
    });
    return resp;
  }

}
