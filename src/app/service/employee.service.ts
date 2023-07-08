import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  vacationRequest(vacReq:any):Observable<any[]>{
    const data = this.http.post<any[]>('https://personal-and-order-default-rtdb.firebaseio.com/vacation.json',vacReq);
    return data;
  }

  getVacationRequest(): Observable<any> {
    return this.http.get('https://personal-and-order-default-rtdb.firebaseio.com/vacation.json').pipe(
      map((res: any) => {
        const vacReq = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            vacReq.push({ ...res[key], id: key });
          }
        }
        return vacReq;
      })
    );
  }

  updateVacationRequest(id: any, item: any): Observable<any> {
    const data = this.http.patch(
      'https://personal-and-order-default-rtdb.firebaseio.com/vacation/' +
        id +
        '.json',
      item
    );
    return data;
  }


  // post notification of illness
  postNotificationOfIllness(employee:any):Observable<any>{
    const data = this.http.post<any[]>('https://personal-and-order-default-rtdb.firebaseio.com/sick.json',employee);
    return data;
  }

  getNotificationOfIllness(): Observable<any> {
    return this.http.get('https://personal-and-order-default-rtdb.firebaseio.com/sick.json').pipe(
      map((res: any) => {
        const sicks = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            sicks.push({ ...res[key], id: key });
          }
        }
        return sicks;
      })
    );
  }
}
