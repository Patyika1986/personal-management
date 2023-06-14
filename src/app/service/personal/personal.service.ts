import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalModule } from './personal.module';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }

  private personalUrl: string = 'https://personal-management-1293e-default-rtdb.firebaseio.com/';

  addPersonal(personal:PersonalModule):Observable<PersonalModule[]>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<PersonalModule[]>(this.personalUrl,personal, { headers });
  }
}
