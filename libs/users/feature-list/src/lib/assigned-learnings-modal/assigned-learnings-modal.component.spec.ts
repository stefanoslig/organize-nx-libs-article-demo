import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedLearningsModalComponent } from './assigned-learnings-modal.component';

describe('AssignedLearningsModalComponent', () => {
  let component: AssignedLearningsModalComponent;
  let fixture: ComponentFixture<AssignedLearningsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedLearningsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedLearningsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
