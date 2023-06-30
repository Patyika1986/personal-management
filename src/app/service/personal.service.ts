import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { PersonalInterface } from './personalInterface';
import { PersonalApiService } from './personal/personalApi.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalService implements OnDestroy{

  private _personals$ = new BehaviorSubject<PersonalInterface[]>([]);
  public personals$: Observable<PersonalInterface[]> = this._personals$.asObservable();


  constructor(private personalApiService: PersonalApiService) { }


  private subject$ = new Subject();
  //get all personals
  public allPersonal(): void {
   this.personalApiService.getPersonal().pipe(takeUntil(this.subject$)).subscribe((allPersonals:PersonalInterface[]) => {
    this._personals$.next(allPersonals);
   });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.unsubscribe();
  }



}
