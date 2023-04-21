import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  apiUrl = 'http://192.168.43.109:8000/api';

  constructor(private http: HttpClient) { }

  sendData(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/endpoint`, data,{headers});
  }
}
