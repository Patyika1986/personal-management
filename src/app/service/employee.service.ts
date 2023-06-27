import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  vacationRequest(vacReq:any):Observable<any[]>{
    const data = this.http.post<any[]>('https://personal-management-1293e-default-rtdb.firebaseio.com/vacation.json',vacReq);
    return data;
  }

  getVacationRequest(): Observable<any> {
    return this.http.get('https://personal-management-1293e-default-rtdb.firebaseio.com/vacation.json').pipe(
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
}
