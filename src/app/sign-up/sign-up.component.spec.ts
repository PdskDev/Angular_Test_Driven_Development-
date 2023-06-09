import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { waitFor } from '@testing-library/angular';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule, SharedModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[placeholder="Username"]');

      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Username');
      expect(input).toBeTruthy();
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[placeholder="Email"]');

      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Email');
      expect(input).toBeTruthy();
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[placeholder="Password"]');

      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
      expect(input).toBeTruthy();
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      expect(input.type).toBe('password');
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="confirmPassword"]');
      const input = signUp.querySelector(
        'input[placeholder="Confirm password"]'
      );

      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Confirm password');
      expect(input).toBeTruthy();
    });

    it('has password type for confirm password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;

      expect(input.type).toBe('password');
    });

    it('has Sign up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent).toContain('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', async () => {
    let button: any;
    let httpTestingController: HttpTestingController;
    let signUp: HTMLElement;

    const setupForm = async () => {
      httpTestingController = TestBed.inject(HttpTestingController);
      signUp = fixture.nativeElement as HTMLElement;

      await fixture.whenStable();

      const usernameInput = signUp.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      const emailInput = signUp.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const passwordInput = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      const confirmPasswordInput = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;
      usernameInput.value = 'nadetdev';
      usernameInput.dispatchEvent(new Event('input'));
      emailInput.value = 'email@email.com';
      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));
      passwordInput.value = '123';
      passwordInput.dispatchEvent(new Event('input'));
      confirmPasswordInput.value = '123';
      confirmPasswordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button = signUp.querySelector('button');
    };

    it('enable Sign Up button when confirm & password have same value', async () => {
      await setupForm();

      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to backend after clicking Sign Up button', async () => {
      await setupForm();

      await button?.click();

      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );
      const requestBody = req.request.body;

      req.flush({});
      fixture.detectChanges();

      expect(requestBody).toEqual({
        username: 'nadetdev',
        email: 'email@email.com',
        password: '123',
      });
    });

    it('disables button when there is an ongoing api call', async () => {
      await setupForm();
      button.click();
      fixture.detectChanges();
      button.click();

      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );

      req.flush({});
      fixture.detectChanges();

      expect(button.disabled).toBeTruthy();
    });

    it('displays spinner after clicking the submit button', async () => {
      await setupForm();
      expect(signUp.querySelector('span[role="status"')).toBeFalsy();
      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"')).toBeTruthy();
    });

    it('does not displays spinner while there is no API request', () => {
      setupForm();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"')).toBeFalsy();
    });

    it('displays account activation notification after successful sign up request', async () => {
      await setupForm();
      expect(signUp.querySelector('.alert-success')).toBeFalsy();
      button.click();
      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );
      req.flush({});
      fixture.detectChanges();
      const message = signUp.querySelector('.alert-success');
      expect(message?.textContent).toContain(
        'Please check your e-mail to activate your account'
      );
    });

    it('hide sign up form after successfull sign up request', async () => {
      await setupForm();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeTruthy();
      button.click();
      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );
      req.flush({});
      fixture.detectChanges();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeFalsy();
    });

    it('displays validation error coming from backend after submit failure', async () => {
      await setupForm();
      button.click();

      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );
      req.flush(
        {
          validationErrors: {
            email: 'E-mail in use',
          },
        },
        { status: 400, statusText: 'Bad request' }
      );

      fixture.detectChanges();

      const validationElement = signUp.querySelector(
        `div[data-testid="email-validation"]`
      );
      expect(validationElement?.textContent).toContain('E-mail in use');
    });

    it('hides spinner after sign up request failure', async () => {
      await setupForm();
      button.click();

      const req = httpTestingController.expectOne(
        'http://localhost:3000/users'
      );

      req.flush(
        {
          validationErrors: {
            email: 'E-mail in use',
          },
        },
        { status: 400, statusText: 'Bad request' }
      );

      fixture.detectChanges();
      //Fausse reponse
      expect(signUp.querySelector('span[role="status"')).toBeTruthy();
    });
  });

  describe('Validation', async () => {
    const testCases = [
      { field: 'username', value: '', error: 'Username is required' },
      {
        field: 'username',
        value: 'abc',
        error: 'Username must be at least 4 characters long',
      },
      {
        field: 'email',
        value: 'wrong-format',
        error: 'Invalid e-mail address',
      },

      { field: 'password', value: '', error: 'Password is required' },
      {
        field: 'password',
        value: '123',
        error: 'Password must be at least 4 characters long',
      },
      {
        field: 'password',
        value: 'password',
        error:
          'Password must have at least 1 uppercase, 1 lowercase letter and 1 number',
      },
      {
        field: 'password',
        value: 'passWORD',
        error:
          'Password must have at least 1 uppercase, 1 lowercase letter and 1 number',
      },
      {
        field: 'password',
        value: '123456',
        error:
          'Password must have at least 1 uppercase, 1 lowercase letter and 1 number',
      },
      {
        field: 'password',
        value: 'pass123',
        error:
          'Password must have at least 1 uppercase, 1 lowercase letter and 1 number',
      },
      {
        field: 'password',
        value: 'PASS123',
        error:
          'Password must have at least 1 uppercase, 1 lowercase letter and 1 number',
      },

      {
        field: 'confirmPassword',
        value: 'PASS1235',
        error: 'Password mismatch. Please try again',
      },
    ];

    testCases.forEach(({ field, value, error }) => {
      it(`displays "${error}" when "${field}" has "${value}"`, async () => {
        const signUp = fixture.nativeElement as HTMLElement;

        expect(
          signUp.querySelector(`div[data-testid="${field}-validation"]`)
        ).toBeNull();

        const input = signUp.querySelector(
          `input[id="${field}"]`
        ) as HTMLInputElement;

        input.value = value;

        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        const validationElement = signUp.querySelector(
          `div[data-testid="${field}-validation"]`
        );

        expect(validationElement?.textContent).toContain(error);
      });
    });

    it(`displays E-mail in use when email is not unique`, async () => {
      let httpTestingController = TestBed.inject(HttpTestingController);
      const signUp = fixture.nativeElement as HTMLElement;

      expect(
        signUp.querySelector(`div[data-testid="email-validation"]`)
      ).toBeNull();

      const input = signUp.querySelector(
        `input[id="email"]`
      ) as HTMLInputElement;

      input.value = 'email@email.com';

      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));

      const request = httpTestingController.expectOne(
        ({ url, method, body }) => {
          if (
            url === `http://localhost:3000/users?email=${input.value}` &&
            method === 'GET'
          ) {
            return true;
          }
          return false;
        }
      );

      request.flush({});

      fixture.detectChanges();

      const validationElement = signUp.querySelector(
        `div[data-testid="email-validation"]`
      );
      expect(validationElement?.textContent).toContain('E-mail in use');
    });
  });
});
