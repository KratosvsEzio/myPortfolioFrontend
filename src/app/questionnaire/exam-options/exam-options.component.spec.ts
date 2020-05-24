import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOptionsComponent } from './exam-options.component';

describe('ExamOptionsComponent', () => {
  let component: ExamOptionsComponent;
  let fixture: ComponentFixture<ExamOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
