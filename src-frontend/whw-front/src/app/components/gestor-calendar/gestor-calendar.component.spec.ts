import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorCalendarComponent } from './gestor-calendar.component';

describe('GestorCalendarComponent', () => {
  let component: GestorCalendarComponent;
  let fixture: ComponentFixture<GestorCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorCalendarComponent]
    });
    fixture = TestBed.createComponent(GestorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
