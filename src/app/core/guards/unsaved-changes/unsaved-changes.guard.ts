import { CanDeactivateFn } from '@angular/router';
import { UnsavedChanges } from './unsaved-changes.interface';
import { inject } from '@angular/core';
import { UnsavedChangesService } from '@core/services/unsaved-changes/unsaved-changes.service';

export const unsavedChangesGuard: CanDeactivateFn<UnsavedChanges> = (
  component: UnsavedChanges
) => {
  const unsavedChangesModal = inject(UnsavedChangesService);

  if (
    'hasUnsavedChanges' in component &&
    typeof component.hasUnsavedChanges === 'function'
  ) {
    if (component.hasUnsavedChanges()) {
      return unsavedChangesModal.showUnsavedChangesAlert();
    }
  }

  return true;
};
