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
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
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
}
