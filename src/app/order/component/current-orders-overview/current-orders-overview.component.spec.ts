import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrdersOverviewComponent } from './current-orders-overview.component';

describe('CurrentOrdersOverviewComponent', () => {
  let component: CurrentOrdersOverviewComponent;
  let fixture: ComponentFixture<CurrentOrdersOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentOrdersOverviewComponent]
    });
    fixture = TestBed.createComponent(CurrentOrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
