import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderApiService } from 'src/app/service/orderApi.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private orderApiService: OrderApiService,
    private personalService: PersonalService
  ) {}

  public orderedList: any[] = [];
  public orderStatus = ['Open', 'In Progress', 'Completed'];

  public timeStatus = ['0:00', '15:00', '30:00', '45:00', '1:00'];
  private subject$ = new Subject();

  ngOnInit(): void {
    this.personalService.allPersonal();
    this.orderApiService.getOrdersList().pipe(takeUntil(this.subject$)).subscribe((employeeOrderList) => {
      employeeOrderList.map((data: any) => {        
        this.orderedList.push(data);

        const logedEmployee = localStorage.getItem('employeeIsLogd')!;
        const jsonLogedEmployee = JSON.parse(logedEmployee);

        if (isNaN(jsonLogedEmployee)) {
          this.personalService.personals$.pipe(takeUntil(this.subject$)).subscribe((employeeList) => {
            const findEmployee = employeeList.find(
              (emp: any) =>
                emp.email === jsonLogedEmployee.email &&
                emp.password === jsonLogedEmployee.id
            );
            if (findEmployee) {
              const findWithNameEmployeeToOrdered = this.orderedList.find(
                (name: any) => name.selectEmployee == findEmployee.lastName
                );
                
                if (findWithNameEmployeeToOrdered) {
                this.orderedList = [];
                this.orderedList.push(findWithNameEmployeeToOrdered);                
              }
            }
          });
        }
      });
    });
  }

  selectedOrderStatus($event: any) {
    console.log($event.target.value);
    this.orderedList.map((data) => {
      data.status = $event.target.value;
      console.log(data);
      this.orderApiService.updateOrder(data.id, data).pipe(takeUntil(this.subject$)).subscribe((list) => {
        list.status = $event.target.value;
      });
    });
  }

  selectOrderTimeFrom($event: any) {
    this.orderedList.map((data) => {
      data.orderTimeFrom = $event.target.value;
      this.orderApiService.updateOrder(data.id, data).pipe(takeUntil(this.subject$)).subscribe((list) => {
        list.orderTimeFrom = $event.target.value;
      });
    });
  }

  selectOrderTimeTo($event: any) {
    this.orderedList.map((data) => {
      data.orderTimeTo = $event.target.value;
      this.orderApiService.updateOrder(data.id, data).pipe(takeUntil(this.subject$)).subscribe((list) => {
        list.orderTimeTo = $event.target.value;
      });
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
