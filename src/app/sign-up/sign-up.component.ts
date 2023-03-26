import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //buttonIsDisabled = false;
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onClickSignUp() {
    this.apiProgress = true;

    this.userService
      .signUp({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {
        this.signUpSuccess = true;
      });
  }

  isButtonDisabled() {
    if (
      this.password == this.confirmPassword &&
      this.password != '' &&
      this.confirmPassword != ''
    ) {
      return false;
    } else {
      return true;
    }
  }
}
