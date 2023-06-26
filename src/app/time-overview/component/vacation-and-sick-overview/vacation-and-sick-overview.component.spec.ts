import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationAndSickOverviewComponent } from './vacation-and-sick-overview.component';

describe('VacationAndSickOverviewComponent', () => {
  let component: VacationAndSickOverviewComponent;
  let fixture: ComponentFixture<VacationAndSickOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacationAndSickOverviewComponent]
    });
    fixture = TestBed.createComponent(VacationAndSickOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
