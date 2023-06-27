import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { OrderService } from 'src/app/service/order.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

  constructor(private router: Router, private personalService: PersonalService,
    private orderService: OrderService,
    private employeeService: EmployeeService){}

  public currentOrdersBadge:number = 0;
  public employeeLength: number = 0;
  public currentPersonalLength: number = 0;
  public currentOrderLength: number = 0;
  public requestsLength:number = 0;

  ngOnInit(): void {

    this.employeeService.getVacationRequest().subscribe(req => this.requestsLength = req.length)
    
    this.personalService.getPersonal().subscribe(list => {
      this.currentPersonalLength = list.length;      
    });

    this.orderService.getOrdersList().subscribe(list => {
      this.currentOrderLength = list.length;
    })
  }


  navigateToPersonal(){
    this.router.navigate(['personal-overview'])
  }

}
