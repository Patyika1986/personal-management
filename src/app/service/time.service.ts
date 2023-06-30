import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { TimeInterface } from '../time-overview/timeInterface';
import { VacationsInterface } from '../time-overview/vacationsInterface';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private employeeService: EmployeeService) { }

  private _personalsVacations$ = new BehaviorSubject<VacationsInterface[]>([]);
  public personalsVacations$: Observable<VacationsInterface[]> = this._personalsVacations$.asObservable();

  private subject$ = new Subject();

  loadEmployeeVacations(): void {
    this.employeeService.getVacationRequest().pipe(takeUntil(this.subject$)).subscribe((list) => {
      this._personalsVacations$.next(list);
    })
  }
}
