import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Personals } from 'src/app/Personal-Module/personals';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(private http: HttpClient) {}

  selectedEmployeeId = signal('');

  private personalUrl: string =
    'https://personal-management-1293e-default-rtdb.firebaseio.com/personal.json';
  private postUrl: string =
    'https://personal-management-1293e-default-rtdb.firebaseio.com/personal/';

  addPersonal(personal: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(this.personalUrl, personal);
  }

  getPersonal(): Observable<any> {
    return this.http.get(this.personalUrl).pipe(
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

  postPersonal(personal: any, id: any): Observable<any> {
    console.log(id);
    
    const data = this.http.put('https://personal-management-1293e-default-rtdb.firebaseio.com/personal/' +id+ '.json',personal);
    return data;
  }

  deletePersonal(id:any):Observable<any>{
    return this.http.delete<any>(`https://personal-management-1293e-default-rtdb.firebaseio.com/personal/${id}.json`);
  }
}
