import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item in storage', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value).subscribe();

    // Assert
    const retrievedValue = service.getItem(key).subscribe(res => {
      expect(retrievedValue).toEqual(res);
    });
  });

  it('should delete item from storage', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value).subscribe();
    service.deleteItem(key).subscribe();

    // Assert
    const retrievedValue = service.getItem(key).subscribe(() => {
      expect(retrievedValue).toBeUndefined();
    });
  });

  it('should clear storage', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value).subscribe();
    service.clear().subscribe();

    // Assert
    const retrievedValue = service.getItem(key).subscribe(() => {
      expect(retrievedValue).toBeUndefined();
    });
  });
});
