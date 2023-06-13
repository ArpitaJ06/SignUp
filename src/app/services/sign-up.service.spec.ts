import { TestBed } from '@angular/core/testing';

import { SignUpService } from './sign-up.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SignUpService', () => {
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService]
    });
    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to the correct URL with the provided data', () => {
    const mockUserData = {
      firstName: 'Arpita',
      lastName: 'Jain',
      email: 'arpita.jain5137@gmail.com'
    };

    service.postDetails(mockUserData).subscribe();

    const req = httpMock.expectOne('https://demo-api.vercel.app/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserData);

    req.flush({ success: true });
  });
});
