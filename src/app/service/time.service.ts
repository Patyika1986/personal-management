import { Injectable, OnDestroy } from '@angular/core';
import { EmployeeService } from './employee.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { VacationsInterface } from '../time-overview/vacationsInterface';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy{

  constructor(private employeeService: EmployeeService) { }

  private _personalsVacations$ = new BehaviorSubject<VacationsInterface[]>([]);
  public personalsVacations$: Observable<VacationsInterface[]> = this._personalsVacations$.asObservable();

  private subject$ = new Subject();

  loadEmployeeVacations(): void {
    this.employeeService.getVacationRequest().pipe(takeUntil(this.subject$)).subscribe((list) => {
      this._personalsVacations$.next(list);
    })
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }
}
