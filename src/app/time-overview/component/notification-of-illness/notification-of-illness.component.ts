import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { PersonalApiService } from 'src/app/service/personal/personalApi.service';

@Component({
  selector: 'app-notification-of-illness',
  templateUrl: './notification-of-illness.component.html',
  styleUrls: ['./notification-of-illness.component.scss'],
})
export class NotificationOfIllnessComponent implements OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private personalApiService: PersonalApiService
  ) {}

  public form = this.formBuilder.group({
    sickFrom: ['', Validators.required],
    sickTo: ['', Validators.required],
    sickOn: [new Date()],
    empId: [''],
    employeeName: [''],
  });

  private subject$ = new Subject();

  reportSick() {
    const logedEmployee = localStorage.getItem('employeeIsLogd')!;
    const jsonLogedEmployee = JSON.parse(logedEmployee);

    this.personalApiService
      .getPersonal()
      .pipe(takeUntil(this.subject$))
      .subscribe((employeeList) => {
        const result = employeeList.find(
          (emp: any) => emp.id === jsonLogedEmployee.password
        );
        this.form.controls.empId.setValue(result.id);
        let name = `${result.firstName} ${result.lastName}`;
        this.form.controls.employeeName.setValue(name);
        if (this.form.status === 'VALID') {
          console.log(result);

          this.employeeService
            .postNotificationOfIllness(this.form.value)
            .pipe(takeUntil(this.subject$))
            .subscribe();
          console.log(this.form.value, 'alert success meldung');
        } else {
          console.log('alert wrong meldung');
        }
      });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
