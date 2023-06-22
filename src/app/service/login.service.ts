import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private loginUrl: string = 'https://personal-management-1293e-default-rtdb.firebaseio.com/login.json'
  postLogin(employee:any):Observable<any>{
    const data = this.http.post(this.loginUrl,employee);
    return data;
  }
}
