import { of } from 'rxjs';
import { TokenInterceptor } from './token.interceptor';
import { HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { StorageService } from '@core/services/storage/storage.service';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let storageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    storageService = {
      getItem: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;
    interceptor = new TokenInterceptor(storageService);
  });

  it('should add an Authorization header', done => {
    // Arrange
    const request = new HttpRequest('GET', 'https://test.com');
    storageService.getItem.mockReturnValue(of('test-token'));
    const next = {
      handle: jest.fn().mockImplementation(req => {
        // Assert inside handle to access the cloned request
        expect(req.headers.get('Authorization')).toBe('Bearer test-token');
        done();
        return of({ type: HttpEventType.Response });
      }),
    } as unknown as HttpHandler;

    // Act
    interceptor.intercept(request, next).subscribe();
  });
});
