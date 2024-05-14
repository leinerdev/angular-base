import { TestBed } from '@angular/core/testing';
import { FORM_ERRORS } from './form-errors-messages';

describe('FORM_ERRORS', () => {
  let formErrors: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FORM_ERRORS }],
    });

    formErrors = TestBed.inject(FORM_ERRORS);
  });

  it('debería devolver el mensaje de error correcto para "required"', () => {
    // Arrange
    const errorKey = 'required';
    const params = {};

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('El campo es requerido');
  });

  it('debería devolver el mensaje de error correcto para "min"', () => {
    // Arrange
    const errorKey = 'min';
    const params = { min: 5 };

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('Valor mínimo 5');
  });

  it('debería devolver el mensaje de error correcto para "max"', () => {
    // Arrange
    const errorKey = 'max';
    const params = { max: 10 };

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('Valor máximo 10');
  });

  it('debería devolver el mensaje de error correcto para "email"', () => {
    // Arrange
    const errorKey = 'email';
    const params = {};

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('Esto no es un correo');
  });

  it('debería devolver el mensaje de error correcto para "minlength"', () => {
    // Arrange
    const errorKey = 'minlength';
    const params = { requiredLength: 3, actualLength: 2 };

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('Mínimo 3 caracteres, actual 2');
  });

  it('debería devolver el mensaje de error correcto para "maxlength"', () => {
    // Arrange
    const errorKey = 'maxlength';
    const params = { requiredLength: 10, actualLength: 15 };

    // Act
    const mensajeError = formErrors[errorKey](params);

    // Assert
    expect(mensajeError).toBe('Máximo 10 caracteres, actual 15');
  });
});
