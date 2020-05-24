import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseTimeComponent } from './pause-time.component';

describe('PauseTimeComponent', () => {
  let component: PauseTimeComponent;
  let fixture: ComponentFixture<PauseTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
