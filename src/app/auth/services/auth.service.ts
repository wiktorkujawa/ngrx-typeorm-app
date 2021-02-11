import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post<User>(`${environment.apiUrl}/register`,data);
  }

  login(data: any):Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/login`,data);
  }

  getUser():Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }

  logout(){
    return this.http.get(`${environment.apiUrl}/logout`);
  }


}
