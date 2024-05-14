import { InjectionToken } from '@angular/core';

export type FormErrorsMessages = typeof formErrorsMessage;

const formErrorsMessage = {
  required: () => 'El campo es requerido',
  min: ({ min }: Record<string, number>) => `Valor mínimo ${min}`,
  max: ({ max }: Record<string, number>) => `Valor máximo ${max}`,
  email: () => 'Esto no es un correo',
  minlength: ({ requiredLength, actualLength }: Record<string, number>) =>
    `Mínimo ${requiredLength} caracteres, actual ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }: Record<string, number>) =>
    `Máximo ${requiredLength} caracteres, actual ${actualLength}`,
  pattern: () => 'El valor introducido no es válido',
};

export const FORM_ERRORS = new InjectionToken<FormErrorsMessages>(
  'FORM_ERRORS',
  {
    providedIn: 'root',
    factory: () => formErrorsMessage,
  }
);
