import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorHandlerResponse } from './error-handler-response.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: HttpErrorResponse): void {
    this.printConsoleError(error); // You can use this
    this.printConsoleErrorMessage(error.message); // or this
  }

  private printConsoleError(mensaje: HttpErrorResponse): void {
    const respuesta: ErrorHandlerResponse = {
      date: new Date().toLocaleString(),
      message: mensaje.message,
      status: mensaje.status,
      statusText: mensaje.statusText,
    };
    this.printError(respuesta);
  }

  private printConsoleErrorMessage(mensaje: string): void {
    this.printError(mensaje);
  }

  private printError(error: string | ErrorHandlerResponse): void {
    if (!environment.production) {
      window.console.error('Error inesperado:\n', error);
    }
  }

  // You can also use this method to send the error to a log service or show toast error
}
