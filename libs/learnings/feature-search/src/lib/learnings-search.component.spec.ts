import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningsSearchComponent } from './learnings-search.component';

describe('LearningsSearchComponent', () => {
  let component: LearningsSearchComponent;
  let fixture: ComponentFixture<LearningsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningsSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
