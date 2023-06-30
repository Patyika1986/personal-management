import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { OrderApiService } from 'src/app/service/orderApi.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy{

  constructor(private router: Router,
    private orderApiService: OrderApiService,
    private employeeService: EmployeeService,
    private personalService: PersonalService){}

  public currentOrdersBadge:number = 0;
  public employeeLength: number = 0;
  public currentPersonalLength: number = 0;
  public currentOrderLength: number = 0;
  public requestsLength:number = 0;
  public sickNotificationLength:number = 0;
  private subject$ = new Subject();

  ngOnInit(): void {
    this.personalService.allPersonal();

    this.employeeService.getVacationRequest().subscribe(req => this.requestsLength = req.length);
    this.employeeService.getNotificationOfIllness().subscribe(list => this.sickNotificationLength = list.length);
    
    this.personalService.personals$.pipe(takeUntil(this.subject$)).subscribe(list => {
      this.currentPersonalLength = list.length;      
    });

    this.orderApiService.getOrdersList().subscribe(list => {
      this.currentOrderLength = list.length;
    })
  }


  navigateToPersonal(){
    this.router.navigate(['personal-overview'])
  }

  ngOnDestroy(): void {
    this.subject$.next(false);
    this.subject$.complete();
    this.subject$.unsubscribe();
  }

}
