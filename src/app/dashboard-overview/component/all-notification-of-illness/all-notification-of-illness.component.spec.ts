import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotificationOfIllnessComponent } from './all-notification-of-illness.component';

describe('AllNotificationOfIllnessComponent', () => {
  let component: AllNotificationOfIllnessComponent;
  let fixture: ComponentFixture<AllNotificationOfIllnessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllNotificationOfIllnessComponent]
    });
    fixture = TestBed.createComponent(AllNotificationOfIllnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
