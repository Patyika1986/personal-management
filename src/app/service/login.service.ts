import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getLogedEmployees(): Observable<any> {
    return this.http.get(this.loginUrl).pipe(
      map((res: any) => {
        const products = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            products.push({ ...res[key], id: key });
          }
        }
        return products;
      })
    );
  }

  updateEmployeeLogin(personal: any, id: any): Observable<any> {
    console.log(id);
    
    const data = this.http.put('https://personal-management-1293e-default-rtdb.firebaseio.com/login/' +id+ '.json',personal);
    return data;
  }
}
