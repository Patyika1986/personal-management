import { Component, OnInit } from '@angular/core';
import { OrderApiService } from 'src/app/service/orderApi.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';


@Component({
  selector: 'app-employee-time',
  templateUrl: './employee-time.component.html',
  styleUrls: ['./employee-time.component.scss'],
})
export class EmployeeTimeComponent implements OnInit {
  constructor(
    private orderApiService: OrderApiService,
    private personalApiService: PersonalApiService
  ) {}

  public orderedList: any[] = [];
  public orderTimeFrom: string = '';
  public orderTimeTo: string = '';
  public workedTime: number = 0;
  ngOnInit(): void {
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);

    if (isNaN(jsonLogedEmployee)) {
      this.personalApiService.getPersonal().subscribe((personalList) => {
        this.orderApiService.getOrdersList().subscribe((orderedList) => {
          for (const personals of personalList) {
            const result = orderedList.find(
              (ordered: any) =>
                ordered.selectEmployee === personals.lastName &&
                personals.email === jsonLogedEmployee.email
            );
            if (result) {
              this.orderedList.push(result);
              console.log(this.orderedList);
              
              this.calculateOrderedHours();
            }
          }
        });
      });
    }
  }

  calculateOrderedHours() {
    this.orderedList.map((list) => {
      let from = list.orderTimeFrom;
      let hour = `${from.charAt(0)}${from.charAt(1)}`;
      let min = `${from.charAt(3)}${from.charAt(4)}`;
      let minits = Number(min) / 60;
      let totalFrom = Number(minits) + Number(hour);

      let to = list.orderTimeTo;
      let h = `${to.charAt(0)}${to.charAt(1)}`;
      let m = `${to.charAt(3)}${to.charAt(4)}`;
      let mins = Number(m) / 60;
      let totalTo = Number(mins) + Number(h);

      this.workedTime =   totalTo - totalFrom;
    });
  }
}
