import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningsListComponent } from './learnings-list.component';

describe('LearningsListComponent', () => {
  let component: LearningsListComponent;
  let fixture: ComponentFixture<LearningsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
