import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { PersonalService } from 'src/app/service/personal/personal.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

  constructor(private router: Router, private personalService: PersonalService,
    private orderService: OrderService){}

  public currentOrdersBadge:number = 0;
  public employeeLength: number = 0;
  public totalTimeBadge: number = 0;
  public currentPersonalLength: number = 0;
  public currentOrderLength: number = 0;

  ngOnInit(): void {
    
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
