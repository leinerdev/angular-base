import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoadingService } from '@core/services';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}

  intercept<T, R>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<R>> {
    this._loading.setLoading(true, request.url);

    return next.handle(request).pipe(
      catchError(error => {
        this._loading.setLoading(false, request.url);
        throw error;
      }),
      map((event: HttpEvent<R>) => {
        if (event instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return event;
      })
    );
  }
}
