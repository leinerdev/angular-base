import { Injectable } from '@angular/core';
import { userExperienceMessages } from '@core/constants/user-experience-messages/user-experience-messages';
import { Observable } from 'rxjs';

/*
  This service is used to show a message when the user tries to navigate away from a page with unsaved changes.
  It is used in the unsaved-changes.guard.ts file.

  You can use DialogService of PrimeNG to show a dialog with the message, but in this case, we are using the alert function.
  Also you can use dialog components to show the message, such as Angular Material Dialog, or a custom dialog component.

  You must return an Observable<boolean> in the showUnsavedChangesAlert method, and complete the observer after showing the message.
*/

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesService {
  public showUnsavedChangesAlert(): Observable<boolean> {
    const confirmation = confirm(userExperienceMessages.CAMBIOS_SIN_GUARDAR);
    return new Observable(observer => {
      observer.next(confirmation);
      observer.complete();
    });
  }
}
