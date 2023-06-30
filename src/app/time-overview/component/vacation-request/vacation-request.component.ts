import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss'],
})
export class VacationRequestComponent implements OnInit, OnDestroy {
  constructor(
    private personalApiService: PersonalApiService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  public img: string = '';
  public employeeName: string = '';
  public employeeId: string = '';
  public form = this.formBuilder.group({
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
    days: ['', Validators.required],
    name: [''],
    empId: [''],
    approved: [''],
    applicationDate: [new Date()],
  });
  public vacation: any[] = [];
  private subject$ = new Subject();

  ngOnInit(): void {
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);
    this.personalApiService
      .getPersonal()
      .pipe(takeUntil(this.subject$))
      .subscribe((list) => {
        const result = list.find(
          (emp: any) =>
            emp.email === jsonLogedEmployee.email &&
            emp.id === jsonLogedEmployee.password
        );
        this.img = result.img;
        this.employeeId = result.id;
        this.employeeName = `${result.firstName}  ${result.lastName}`;
      });

    this.employeeService
      .getVacationRequest()
      .pipe(takeUntil(this.subject$))
      .subscribe((vacation) => {
        this.vacation = vacation;
        console.log(vacation, 'vacation');
      });
  }

  vacationRequest() {
    if (this.form.status === 'VALID') {
      this.form.controls.name.setValue(this.employeeName);
      this.form.controls.empId.setValue(this.employeeId);
      this.form.controls.approved.setValue('In Progress');
      this.employeeService
        .vacationRequest(this.form.value)
        .pipe(takeUntil(this.subject$))
        .subscribe();
      console.log('modal success');
    } else {
      console.log('modal wrong');
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
