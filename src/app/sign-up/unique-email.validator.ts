import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isEmailTaken(control.value).pipe(
      map((_) => (_ ? { uniqueEmail: true } : { uniqueEmail: false })),
      catchError(() => of(null))
    );
  }
}
