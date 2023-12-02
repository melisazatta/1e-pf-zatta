import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment.local';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
         expect(service).toBeTruthy();
       });

  it('should retrieve users from the API', () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];

    service.getUsers().subscribe((users) => {
        expect(users).toEqual(jasmine.arrayContaining(mockUsers));
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});