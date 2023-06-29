import { Component, OnInit } from '@angular/core';
import { OrderApiService } from 'src/app/service/orderApi.service';


@Component({
  selector: 'app-current-orders-overview',
  templateUrl: './current-orders-overview.component.html',
  styleUrls: ['./current-orders-overview.component.scss']
})
export class CurrentOrdersOverviewComponent implements OnInit{

  constructor(private orderApiService: OrderApiService){}

  public orderList:any[] = [];
  public orderIsEmpty: boolean = false;
  public time:string = "0:00";

  ngOnInit(): void {
    this.orderApiService.getOrdersList().subscribe(orders => {
      orders.map((dataList:any) => {
        this.orderList.push(dataList)
        console.log(this.orderList);

      });
    });
    if(this.orderList.length < 0){
      this.orderIsEmpty = true;
    }else{
      this.orderIsEmpty = false;
    }


  }

}
