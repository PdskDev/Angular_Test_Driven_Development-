import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //buttonIsDisabled = false;

  form = new FormGroup({
    username: new FormControl(''),
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
}
