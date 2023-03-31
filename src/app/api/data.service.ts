import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Releves } from 'src/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl='https://script-en-ligne.herokuapp.com/getUser.php';
  constructor(private http: HttpClient) { }

  getData():Observable<Releves[]>{
    return this.http.get<Releves[]>(`${this.apiUrl}`);
}
}