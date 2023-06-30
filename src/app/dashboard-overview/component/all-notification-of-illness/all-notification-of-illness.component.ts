import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-all-notification-of-illness',
  templateUrl: './all-notification-of-illness.component.html',
  styleUrls: ['./all-notification-of-illness.component.scss']
})
export class AllNotificationOfIllnessComponent implements OnInit, OnDestroy{
  
  constructor(private employeeService: EmployeeService){}

  public sickLength:number = 0;
  public sickList:any[] = [];
  private subject$ = new Subject();

  ngOnInit(): void {
    this.employeeService.getNotificationOfIllness().pipe(takeUntil(this.subject$)).subscribe(allSickNotifi => {
      this.sickLength = allSickNotifi.length;
      this.sickList = allSickNotifi;
      console.log(this.sickList);
      
    })
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }

}
