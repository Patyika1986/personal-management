import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  private orderUrl: string = 'https://personal-management-1293e-default-rtdb.firebaseio.com/orderList.json';

  postOrder(order:any):Observable<any[]>{
    const data = this.http.post<any[]>(this.orderUrl,order);
    return data;
  }
}
