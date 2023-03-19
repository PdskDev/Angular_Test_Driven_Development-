import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  buttonIsDisabled = true;
  password = '';
  confirmPassword = '';

  constructor() {}

  ngOnInit(): void {}

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    this.buttonIsDisabled = this.password !== this.confirmPassword;
  }

  onChangeConfirmPassword(event: Event) {
    this.confirmPassword = (event.target as HTMLInputElement).value;
    this.buttonIsDisabled = this.password !== this.confirmPassword;
  }
}
