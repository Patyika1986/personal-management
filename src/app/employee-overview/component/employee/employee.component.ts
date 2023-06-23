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

  obj = {
    name: 'first'
  }

  ngOnInit(): void {

    console.log(this.obj);
    
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
                
                // console.log(this.orderedList,'seine aufträge');   
              }
            }
          }); 
        }
      });
    });
  }

  selectedOrderStatus($event:any){
    console.log($event.target.value);

  }

}
