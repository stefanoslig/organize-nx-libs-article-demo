import { API_URL } from '@abc/shared/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LearningsApiService } from './learnings-api.service';

describe('LearningsApiService', () => {
  let service: LearningsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_URL,
          useValue: '',
        },
      ],
    });
    service = TestBed.inject(LearningsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
