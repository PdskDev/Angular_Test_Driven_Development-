import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { UniqueEmailValidator } from './unique-email.validator';
import { UserService } from '../service/user.service';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //buttonIsDisabled = false;

  form = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        ],
        updateOn: 'blur',
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  apiProgress = false;
  signUpSuccess = false;

  constructor(
    private userService: UserService,
    private uniqueEmailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {}

  onClickSignUp() {
    this.apiProgress = true;
    const body: any = this.form.value;
    delete body.confirmPassword;

    this.userService.signUp(body).subscribe({
      next: () => {
        this.signUpSuccess = true;
      },
      error: (httpError: HttpErrorResponse) => {
        this.signUpSuccess = false;
        const emailValidationErrorMessage =
          httpError.error.validationErrors.email;
        this.form
          .get('email')
          ?.setErrors({ backendErrorMessage: emailValidationErrorMessage });
      },
    });
  }

  isButtonDisabled() {
    const formFilled =
      this.form.get('username')?.value &&
      this.form.get('email')?.value &&
      this.form.get('password')?.value &&
      this.form.get('confirmPassword')?.value;

    const validationError =
      this.userNameError ||
      this.emailError ||
      this.passwordError ||
      this.confirmPasswordError;

    if (!formFilled || !validationError) {
      return true;
    } else {
      return false;
    }
  }

  get userNameError() {
    const fieldUsername = this.form.get('username');
    if (
      fieldUsername?.errors &&
      (fieldUsername.touched || fieldUsername.dirty)
    ) {
      if (fieldUsername.errors['required']) {
        return 'Username is required';
      }

      if (fieldUsername.errors['minlength']) {
        return 'Username must be at least 4 characters long';
      }
    }

    return;
  }

  get passwordError() {
    const fieldPassword = this.form.get('password');
    if (
      fieldPassword?.errors &&
      (fieldPassword.touched || fieldPassword.dirty)
    ) {
      if (fieldPassword.errors['required']) {
        return 'Password is required';
      } else if (fieldPassword.errors['minlength']) {
        return 'Password must be at least 4 characters long';
      } else if (fieldPassword.errors['pattern']) {
        return 'Password must have at least 1 uppercase, 1 lowercase letter and 1 number';
      }
    }

    return;
  }

  get confirmPasswordError() {
    if (this.form?.errors && (this.form?.touched || this.form?.dirty)) {
      if (this.form?.errors['passwordMatch']) {
        return 'Password mismatch. Please try again';
      }
    }

    return;
  }

  get emailError() {
    const fieldEmail = this.form.get('email');
    if (fieldEmail?.errors && (fieldEmail.touched || fieldEmail.dirty)) {
      if (fieldEmail.errors['required']) {
        return 'Email is required';
      } else if (fieldEmail.errors['email']) {
        return 'Invalid e-mail address';
      } else if (fieldEmail.errors['uniqueEmail']) {
        return 'E-mail in use';
      } else if (fieldEmail.errors['backendErrorMessage']) {
        return fieldEmail.errors['backendErrorMessage'];
      }
    }
    return;
  }
}
