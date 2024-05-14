import {
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  FORM_ERRORS,
  FormErrorsMessages,
} from '@core/constants/form-errors-messages/form-errors-messages';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input()
  public maxlength: number | null = null;

  @Input()
  public max: number | null = null;

  @Input()
  public min: number | null = null;

  @Input()
  public label = '';

  @Input()
  public type = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public showTooltip = true;

  @Input()
  public tooltipMsg = '';

  public disabled = false;
  public value = '';
  public control!: FormControl;
  public onChange!: (value: string) => void;
  public onTouch!: () => void;
  private _unsubscribe = new Subject<void>();

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(FORM_ERRORS) private errorMessages: FormErrorsMessages,
    private readonly cdf: ChangeDetectorRef
  ) {}

  public get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  ngOnInit(): void {
    this.setComponentControl();
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public getMessageError(): string {
    const actualErrors = this.control?.errors ?? {};
    const [firstError] = Object.keys(actualErrors);
    const errorKey = firstError as keyof FormErrorsMessages;
    return this.errorMessages[errorKey]?.(actualErrors[firstError]) ?? '';
  }

  private setComponentControl() {
    const ngControl = this.injector.get(NgControl);
    this.setControl(ngControl);
    this.cdf.detectChanges();
  }

  private setControl(ngControl: NgControl): void {
    if (ngControl instanceof NgModel) {
      this.setNgModel(ngControl);
    } else if (ngControl instanceof FormControlName) {
      this.setFormControlName(ngControl);
    } else {
      this.setFormControlDirective(ngControl as FormControlDirective);
    }
  }

  private setNgModel(ngControl: NgModel): void {
    const { control, update } = ngControl;
    this.control = control;
    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => update.emit(value));
    this.control.addValidators(this.getValidators());
    this.control.updateValueAndValidity();
  }

  private setFormControlName(ngControl: FormControlName): void {
    this.control = this.injector.get(FormGroupDirective).getControl(ngControl);
  }

  private setFormControlDirective(ngControl: FormControlDirective): void {
    this.control = ngControl.form;
  }

  private getValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (this.type === 'email') {
      validators.push(Validators.email);
    }
    if (this.maxlength) {
      validators.push(Validators.maxLength(this.maxlength));
    }
    if (this.max) {
      validators.push(Validators.max(this.max));
    }
    if (this.min) {
      validators.push(Validators.min(this.min));
    }
    return validators;
  }
}
