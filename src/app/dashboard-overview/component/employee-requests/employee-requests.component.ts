import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
})
export class EmployeeRequestsComponent implements OnInit, OnDestroy {
  constructor(
    private employeeService: EmployeeService,
    private personalService: PersonalService
  ) {}

  public vacationRequestAnswer = [
    'Approved',
    'Declined',
    'Application is still being processed',
  ];

  public requestList: any[] = [];
  private subject$ = new Subject();

  ngOnInit(): void {
    // prüfe ob der ma noch da ist
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);

    this.personalService.personals$.pipe(takeUntil(this.subject$)).subscribe(personalList => {
      const result = personalList.find(personal => personal.email === jsonLogedEmployee.email && personal.id === jsonLogedEmployee.password);
      if(result){
        this.employeeService
        .getVacationRequest().pipe(takeUntil(this.subject$))
        .subscribe((req) => (this.requestList = req));
        console.log(true);
      }else{
        this.requestList = [];
      }
    })



  }

  selectVacationRequestAnswer($event: any, req: any) {
    this.employeeService.getVacationRequest().pipe(takeUntil(this.subject$)).subscribe((list) => {
      const data = list.find((id: any) => id.id === req.id);
      data.approved = $event.target.value;
      if (data) {
        this.employeeService.updateVacationRequest(data.id, data).pipe(takeUntil(this.subject$)).subscribe();
      }
    });
  }


  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
