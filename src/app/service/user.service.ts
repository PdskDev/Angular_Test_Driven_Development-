import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(body: { username: string; email: string; password: string }) {
    return this.httpClient.post('http://localhost:3000/users', body);
  }

  isEmailTaken(value: string) {
    return this.httpClient.get('http://localhost:3000/users?email=' + value);
  }
}
