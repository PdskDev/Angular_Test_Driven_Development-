import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onChangeUsername(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    //this.buttonIsDisabled = this.password !== this.confirmPassword;
  }

  onChangeConfirmPassword(event: Event) {
    this.confirmPassword = (event.target as HTMLInputElement).value;
    //this.buttonIsDisabled = this.password !== this.confirmPassword;
  }

  onClickSignUp() {
    this.apiProgress = true;

    console.log(this.apiProgress);
    /* fetch('/api/1.0/users', {
      method: 'post',
      body: JSON.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); */
    this.httpClient
      .post('http://localhost:3000/users', {
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
