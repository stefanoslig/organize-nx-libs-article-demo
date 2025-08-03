import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningsShellComponent } from './learnings-shell.component';

describe('LearningsShellComponent', () => {
  let component: LearningsShellComponent;
  let fixture: ComponentFixture<LearningsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningsShellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
