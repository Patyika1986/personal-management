import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http:HttpClient) { }
  



  private orderUrl: string = 'https://personal-and-order-default-rtdb.firebaseio.com/orderList.json';

  postOrder(order:any):Observable<any[]>{
    const data = this.http.post<any[]>(this.orderUrl,order);
    return data;
  }

  getOrdersList(): Observable<any> {
    return this.http.get(this.orderUrl).pipe(
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

  updateOrder(id: any, item: any): Observable<any> {
    const data = this.http.patch(
      
      'https://personal-and-order-default-rtdb.firebaseio.com/orderList/' +
        id +
        '.json',
      item
    );
    console.log(data, 'data from service');

    return data;
  }

  deleteOrder(id:any):Observable<any>{
    return this.http.delete<any>(`https://personal-and-order-default-rtdb.firebaseio.com/orderList/${id}.json`);
  }
}
