import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //buttonIsDisabled = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onClickSignUp() {
    this.apiProgress = true;
    const body: any = this.form.value;
    delete body.confirmPassword;

    this.userService.signUp(body).subscribe(() => {
      this.signUpSuccess = true;
    });
  }

  isButtonDisabled() {
    if (
      this.form.get('password')?.value ==
        this.form.get('confirmPassword')?.value &&
      this.form.get('password')?.value != '' &&
      this.form.get('confirmPassword')?.value != ''
    ) {
      return false;
    } else {
      return true;
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
    const fieldConfirmPassword = this.form.get('confirmPassword');
    if (
      fieldConfirmPassword?.errors &&
      (fieldConfirmPassword.touched || fieldConfirmPassword.dirty)
    ) {
      if (fieldConfirmPassword.errors['required']) {
        return 'Confirm password is required';
      }

      if (fieldConfirmPassword.errors['minlength']) {
        return 'Confirmation password must be at least 4 characters long';
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
      }
    }

    return;
  }
}
