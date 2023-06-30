import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
})
export class EmployeeRequestsComponent implements OnInit, OnDestroy {
  constructor(
    private employeeService: EmployeeService
  ) {}

  public vacationRequestAnswer = [
    'Approved',
    'Declined',
    'Application is still being processed',
  ];

  public requestList: any[] = [];
  private subject$ = new Subject();

  ngOnInit(): void {
    this.employeeService
      .getVacationRequest().pipe(takeUntil(this.subject$))
      .subscribe((req) => (this.requestList = req));
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
