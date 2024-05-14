import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpService, Options } from './http.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpClientSpy: {
    get: jest.Mock;
    post: jest.Mock;
    delete: jest.Mock;
    put: jest.Mock;
    patch: jest.Mock;
  };

  beforeEach(() => {
    const spy = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [HttpService, { provide: HttpClient, useValue: spy }],
      imports: [HttpClientTestingModule],
    });

    httpService = TestBed.inject(HttpService);
    httpClientSpy = TestBed.inject(HttpClient) as unknown as {
      get: jest.Mock;
      post: jest.Mock;
      delete: jest.Mock;
      put: jest.Mock;
      patch: jest.Mock;
    };
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('Método doGet', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    httpClientSpy.get.mockReturnValue(of(testData));

    // Act
    const result = httpService.doGet<any>(url);

    // Assert
    expect(result).toEqual(expect.any(Observable));
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('Método doGet con opciones por defecto', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const options: Options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams(),
    };
    httpClientSpy.get.mockReturnValue(of(testData));

    // Act
    const result = httpService.doGet<any>(url, options);

    // Assert
    expect(httpClientSpy.get).toHaveBeenCalledWith(url, options);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPost', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    httpClientSpy.post.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPost(url, body);

    // Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPost con opciones por defecto', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    const options: Options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams(),
    };
    httpClientSpy.post.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPost(url, body, options);

    // Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, body, options);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doDelete', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    httpClientSpy.delete.mockReturnValue(of(testData));

    // Act
    const result = httpService.doDelete(url);

    // Assert
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doDelete con opciones por defecto', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const options: Options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams(),
    };
    httpClientSpy.delete.mockReturnValue(of(testData));

    // Act
    const result = httpService.doDelete(url, options);

    // Assert
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url, options);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPut', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    httpClientSpy.put.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPut(url, body);

    // Assert
    expect(httpClientSpy.put).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPut con opciones por defecto', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    const options: Options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams(),
    };
    httpClientSpy.put.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPut(url, body, options);

    // Assert
    expect(httpClientSpy.put).toHaveBeenCalledWith(url, body, options);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPatch', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    httpClientSpy.patch.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPatch(url, body);

    // Assert
    expect(httpClientSpy.patch).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(expect.any(Observable));
  });

  it('Método doPatch con opciones por defecto', () => {
    // Arrange
    const testData = { message: 'Hello, World!' };
    const url = 'https://example.com/api';
    const body = { data: 'data' };
    const options: Options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams(),
    };
    httpClientSpy.patch.mockReturnValue(of(testData));

    // Act
    const result = httpService.doPatch(url, body, options);

    // Assert
    expect(httpClientSpy.patch).toHaveBeenCalledWith(url, body, options);
    expect(result).toEqual(expect.any(Observable));
  });

  it('should set header correctly', () => {
    // Arrange
    const name = 'Authorization';
    const value = 'application/json';

    // Act
    const result = httpService.setHeader(name, value);

    // Assert
    expect(result.headers?.get(name)).toEqual(value);
  });
});
