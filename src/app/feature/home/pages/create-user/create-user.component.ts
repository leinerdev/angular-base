import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnsavedChanges } from '@core/guards/unsaved-changes/unsaved-changes.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements UnsavedChanges {
  public userForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public hasUnsavedChanges(): boolean {
    return this.userForm.dirty;
  }

  public submit(): void {
    alert('Form submitted');
  }
}
