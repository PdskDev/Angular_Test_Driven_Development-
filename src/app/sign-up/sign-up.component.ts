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
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
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
      }

      if (fieldPassword.errors['minlength']) {
        return 'Password must be at least 8 characters long';
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
        return 'Confirmation password must be at least 8 characters long';
      }
    }

    return;
  }

  get emailError() {
    const fieldUsername = this.form.get('email');
    if (
      fieldUsername?.errors &&
      (fieldUsername.touched || fieldUsername.dirty)
    ) {
      if (fieldUsername.errors['required']) {
        return 'Email is required';
      }

      if (fieldUsername.errors['minlength']) {
        return 'Email must be at least 8 characters long';
      }
    }

    return;
  }
}
