import {
  learnings,
  LearningsApiServiceMock,
} from '@abc/learnings/utils-testing';
import { API_URL } from '@abc/shared/data-access';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LearningsApiService } from './learnings-api.service';
import { LearningsStoreService } from './learnings-store.service';

describe('LearningsStoreService', () => {
  let service: LearningsStoreService;
  let learningsApiService: LearningsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LearningsApiService,
          useClass: LearningsApiServiceMock,
        },
        {
          provide: API_URL,
          useValue: '',
        },
      ],
    });
    service = TestBed.inject(LearningsStoreService);
    learningsApiService = TestBed.inject(LearningsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch learnings and save them to the state', (done) => {
    jest.spyOn(service, 'setState');
    service.fetchLearnings({ page: 1, limit: 10 });

    learningsApiService.fetchLearnings({ page: 1, limit: 10 }).subscribe(() => {
      expect(service.setState).toHaveBeenCalledWith({
        learnings,
        searching: false,
        paginationTotalCount: 0,
      });
      done();
    });
  });

  it('should search for a learning', (done) => {
    jest.spyOn(service, 'setState');
    service.search('Paradigm Specialist', { page: 1, limit: 10 });

    learningsApiService
      .searchLearnings('Paradigm Specialist', { page: 1, limit: 10 })
      .subscribe(() => {
        expect(service.setState).toHaveBeenCalledTimes(2);
        expect(service.setState).toHaveBeenCalledWith({
          searching: true,
          learnings: [],
          paginationTotalCount: 0,
        });
        expect(service.setState).toHaveBeenLastCalledWith({
          searching: false,
          learnings: [learnings[1]],
          paginationTotalCount: 0,
        });
        done();
      });
  });

  it('should delete a learning', (done) => {
    jest.spyOn(service, 'setState');
    service.setState({ learnings, searching: false, paginationTotalCount: 0 });
    service.deleteLearning(1);

    learningsApiService.deleteLearning(1).subscribe(() => {
      expect(service.setState).toHaveBeenLastCalledWith({
        searching: false,
        learnings: [learnings[1]],
        paginationTotalCount: 0,
      });
      done();
    });
  });
});
