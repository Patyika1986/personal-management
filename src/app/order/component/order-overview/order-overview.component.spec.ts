import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewComponent } from './order-overview.component';

describe('OrderOverviewComponent', () => {
  let component: OrderOverviewComponent;
  let fixture: ComponentFixture<OrderOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderOverviewComponent]
    });
    fixture = TestBed.createComponent(OrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
