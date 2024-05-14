import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent],
      declarations: [CreateUserComponent],
    });
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if form is dirty', () => {
    // Act
    component.userForm.markAsDirty();

    // Assert
    expect(component.hasUnsavedChanges()).toBeTruthy();
  });

  it('shoud return false if form is not dirty', () => {
    // Assert
    expect(component.hasUnsavedChanges()).toBeFalsy();
  });

  it('should alert when form is submitted', () => {
    // Arrange
    jest.spyOn(window, 'alert');

    // Act
    component.submit();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Form submitted');
  });
});
