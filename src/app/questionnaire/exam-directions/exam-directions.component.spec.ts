import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDirectionsComponent } from './exam-directions.component';

describe('ExamDirectionsComponent', () => {
  let component: ExamDirectionsComponent;
  let fixture: ComponentFixture<ExamDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDirectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
