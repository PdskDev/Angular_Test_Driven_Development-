import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
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
      //const inputs = signUp.querySelectorAll('input[placeholder="Email"]');
      //expect(inputs.length).toBe(2);
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
      expect(button?.textContent).toBe('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('enable Sign Up button when confirm & password have same value', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const passwordInput = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      const confirmPasswordInput = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;

      passwordInput.value = '123';
      passwordInput.dispatchEvent(new Event('input'));

      confirmPasswordInput.value = '123';
      confirmPasswordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to backend after clicking Sign Up button', () => {
      //Mock fetch
      const spy = spyOn(window, 'fetch');

      const signUp = fixture.nativeElement as HTMLElement;

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

      passwordInput.value = '123';
      passwordInput.dispatchEvent(new Event('input'));

      confirmPasswordInput.value = '123';
      confirmPasswordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const button = signUp.querySelector('button');

      button?.click();
      const args = spy.calls.allArgs()[0];
      const secondParam = args[1] as RequestInit;
      expect(secondParam.body).toEqual(
        JSON.stringify({
          username: 'nadetdev',
          email: 'email@email.com',
          password: '123',
        })
      );
    });
  });
});
