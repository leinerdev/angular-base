import { TestBed } from '@angular/core/testing';
import { UnsavedChangesService } from './unsaved-changes.service';
import { userExperienceMessages } from '@core/constants/user-experience-messages/user-experience-messages';

describe('UnsavedChangesService', () => {
  let service: UnsavedChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedChangesService],
    });
    service = TestBed.inject(UnsavedChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show unsaved changes alert', () => {
    // Arrange
    jest.spyOn(window, 'confirm');

    // Act
    const result = service.showUnsavedChangesAlert();

    // Assert
    expect(window.confirm).toHaveBeenCalledWith(
      userExperienceMessages.CAMBIOS_SIN_GUARDAR
    );
    expect(result).toBeTruthy();
  });
});
