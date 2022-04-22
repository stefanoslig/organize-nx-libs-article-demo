import { users, UsersApiServiceMock } from '@abc/users/utils-testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersApiService } from './users-api.service';

import { UsersStoreService } from './users-store.service';
import { API_URL } from '@abc/shared/data-access';

describe('UsersStoreService', () => {
  let service: UsersStoreService;
  let usersApiService: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: UsersApiService,
          useClass: UsersApiServiceMock,
        },
        {
          provide: API_URL,
          useValue: '',
        },
      ],
    });
    service = TestBed.inject(UsersStoreService);
    usersApiService = TestBed.inject(UsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users and save them to the state', (done) => {
    jest.spyOn(service, 'setState');
    service.fetchUsers();

    usersApiService.fetchUsers().subscribe(() => {
      expect(service.setState).toHaveBeenCalledWith({
        users,
        searching: false,
      });
      done();
    });
  });

  it('should search for a user', (done) => {
    jest.spyOn(service, 'setState');
    service.searchUsers('François Martin');

    usersApiService.searchUsers('François Martin').subscribe(() => {
      expect(service.setState).toHaveBeenCalledTimes(2);
      expect(service.setState).toHaveBeenCalledWith({
        searching: true,
        users: [],
      });
      expect(service.setState).toHaveBeenLastCalledWith({
        searching: false,
        users: [users[1]],
      });
      done();
    });
  });

  it('should delete a user', (done) => {
    jest.spyOn(service, 'setState');
    service.setState({ users, searching: false });
    service.deleteUser(1);

    usersApiService.deleteUser(1).subscribe(() => {
      expect(service.setState).toHaveBeenLastCalledWith({
        searching: false,
        users: [users[1]],
      });
      done();
    });
  });
});
