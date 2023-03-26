import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(body: { username: string; email: string; password: string }) {
    return this.httpClient.post('http://localhost:3000/users', body);
  }
}
