import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

  constructor(private orderService:OrderService,private personalService: PersonalService){
  }

  public orderedList:any[] = [];
  public orderStatus = [
    "Open",
    "In Progress",
    "Completed"
  ]; 

  public timeStatus = [
    "0:00",
    "15:00",
    "30:00",
    "45:00",
    "1:00",
  ];
  

  ngOnInit(): void {


    
    this.orderService.getOrdersList().subscribe((employeeOrderList) => {
      employeeOrderList.map((data:any) => {
        this.orderedList.push(data);

        const logedEmployee = localStorage.getItem("employeeIsLogd")!;
        const jsonLogedEmployee = JSON.parse(logedEmployee);

        if(isNaN(jsonLogedEmployee)){
          this.personalService.getPersonal().subscribe(employeeList => {
            const findEmployee = employeeList.find((emp:any) => emp.email === jsonLogedEmployee.email && emp.password === jsonLogedEmployee.id);
            if(findEmployee){
              const findWithNameEmployeeToOrdered = this.orderedList.find((name:any) => name.selectEmployee == findEmployee.lastName);
              if(findWithNameEmployeeToOrdered){
                this.orderedList = [];
                this.orderedList.push(findWithNameEmployeeToOrdered);
              }
            }
          }); 
        }
      });
    });
  }

  selectedOrderStatus($event:any){
    console.log($event.target.value);
    this.orderedList.map((data) => {
      data.status = $event.target.value;
      console.log(data);
      this.orderService.updateOrder(data.id,data).subscribe(list => {
        list.status = $event.target.value;
      });
    });
  }

  selectOrderTimeFrom($event:any){
    this.orderedList.map((data) => {
      data.orderTimeFrom = $event.target.value;
      this.orderService.updateOrder(data.id,data).subscribe(list => {
        list.orderTimeFrom = $event.target.value;
      });
    });
  }

  selectOrderTimeTo($event:any){
    this.orderedList.map((data) => {
      data.orderTimeTo = $event.target.value;
      this.orderService.updateOrder(data.id,data).subscribe(list => {
        list.orderTimeTo = $event.target.value;
      });
    });
  }

}
