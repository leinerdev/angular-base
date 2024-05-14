import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '@core/services';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadingInterceptor,
        LoadingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set loading to true before making the request', () => {
    const url = '/api/data';
    const requestData = { id: 1 };

    httpClient.get(url).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    expect(loadingService.isLoading(url)).toBe(true);

    req.flush(requestData);
  });

  it('should set loading to false after successful response', () => {
    const url = '/api/data';
    const responseData = { id: 1 };

    httpClient.get(url).subscribe(response => {
      expect(response).toEqual(responseData);
      expect(loadingService.isLoading(url)).toBe(false);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(responseData);
  });

  it('should set loading to false after error response', () => {
    const url = '/api/data';
    const errorMessage = 'Internal Server Error';

    httpClient.get(url).subscribe(
      () => {},
      error => {
        expect(error).toBe(errorMessage);
        expect(loadingService.isLoading(url)).toBe(false);
      }
    );

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
