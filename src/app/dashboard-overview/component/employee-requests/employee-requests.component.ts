import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.scss'],
})
export class EmployeeRequestsComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService
  ) {}

  public vacationRequestAnswer = [
    'Approved',
    'Declined',
    'Application is still being processed',
  ];

  public requestList: any[] = [];

  ngOnInit(): void {
    this.employeeService
      .getVacationRequest()
      .subscribe((req) => (this.requestList = req));
  }

  selectVacationRequestAnswer($event: any, req: any) {
    this.employeeService.getVacationRequest().subscribe((list) => {
      const data = list.find((id: any) => id.id === req.id);
      data.approved = $event.target.value;
      if (data) {
        this.employeeService.updateVacationRequest(data.id, data).subscribe();
      }
    });
  }
}
