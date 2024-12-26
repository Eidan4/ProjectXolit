import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalPageComponent } from './internal-page.component';

describe('InternalPageComponent', () => {
  let component: InternalPageComponent;
  let fixture: ComponentFixture<InternalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
