import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsMainComponent } from './reservations-main.component';

describe('ReservationsMainComponent', () => {
  let component: ReservationsMainComponent;
  let fixture: ComponentFixture<ReservationsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
