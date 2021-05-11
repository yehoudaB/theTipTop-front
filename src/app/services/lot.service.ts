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


  getLots(): Observable<any>{
    return this.httpClient.get(
      'https://api.dsp4-5archio19-ah-je-gh-yb.fr/api/lots/', 
    )
  }
}

