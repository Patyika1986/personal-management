import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeComponent } from './employee-time.component';

describe('EmployeeTimeComponent', () => {
  let component: EmployeeTimeComponent;
  let fixture: ComponentFixture<EmployeeTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeTimeComponent]
    });
    fixture = TestBed.createComponent(EmployeeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
