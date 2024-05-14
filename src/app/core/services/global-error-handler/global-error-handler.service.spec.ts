import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should print console error message', () => {
    jest.spyOn(console, 'error');
    const errorMessage = 'Test error message';
    service.handleError({ message: errorMessage } as HttpErrorResponse);
    expect(console.error).toHaveBeenCalledWith(
      'Error inesperado:\n',
      errorMessage
    );
  });
});
