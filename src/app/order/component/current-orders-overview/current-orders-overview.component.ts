import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderApiService } from 'src/app/service/orderApi.service';

@Component({
  selector: 'app-current-orders-overview',
  templateUrl: './current-orders-overview.component.html',
  styleUrls: ['./current-orders-overview.component.scss'],
})
export class CurrentOrdersOverviewComponent implements OnInit, OnDestroy {
  constructor(private orderApiService: OrderApiService) {}

  public orderList: any[] = [];
  public orderIsEmpty: boolean = false;
  public time: string = '0:00';
  private subject$ = new Subject();

  ngOnInit(): void {
    this.orderApiService
      .getOrdersList()
      .pipe(takeUntil(this.subject$))
      .subscribe((orders) => {
        orders.map((dataList: any) => {
          this.orderList.push(dataList);
          console.log(this.orderList);
        });
      });
    if (this.orderList.length < 0) {
      this.orderIsEmpty = true;
    } else {
      this.orderIsEmpty = false;
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
