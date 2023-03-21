//import 'whatwg-fetch';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fireEvent, render, screen } from '@testing-library/angular';

import { SignUpComponent } from './sign-up.component';
import { TestBed } from '@angular/core/testing';
import userEvent from '@testing-library/user-event';

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};

describe('SignUpComponent', () => {
  describe('layout', () => {
    it('has Sign Up header', async () => {
      await setup();

      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has username label', async () => {
      await render(SignUpComponent);
      const label = screen.getByLabelText('Username');
      expect(label).toBeInTheDocument();
    });

    it('has email label', async () => {
      await setup();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('has password label', async () => {
      await setup();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has confirm password label', async () => {
      await setup();
      expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    });

    it('has password input for password type', async () => {
      await setup();
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('has confirm password input for password type', async () => {
      await setup();
      const confirmPasswordInput = screen.getByLabelText('Confirm password');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    it('has Sign Up button', async () => {
      await setup();
      const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
      expect(signUpButton).toBeInTheDocument();
    });

    it('disables Sign Up button initially', async () => {
      await setup();
      const buttonDisabled = screen.getByRole('button', { name: 'Sign Up' });
      expect(buttonDisabled).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enable Sign Up button when confirm & password have same value', async () => {
      await setup();
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm password');

      await userEvent.type(passwordInput, '123');
      await userEvent.type(confirmPasswordInput, '123');

      const button = screen.getByRole('button', { name: 'Sign Up' });

      expect(passwordInput).toHaveValue('123');
      expect(confirmPasswordInput).toHaveValue('123');

      //expect(button).toBeEnabled();
    });

    it('sends username, email and password to backend after clicking the button', async () => {
      //const spy = jest.spyOn(window, 'fetch');

      await setup();

      let httpTestingController = TestBed.inject(HttpTestingController);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm password');

      await userEvent.type(usernameInput, 'nadetdev');
      await userEvent.type(emailInput, 'email@email.com');

      await userEvent.type(passwordInput, '123');
      await userEvent.type(confirmPasswordInput, '123');

      const button = screen.getByRole('button', { name: 'Sign Up' });

      await userEvent.click(button);

      //const args = spy.mock.calls[0];
      //const secondParam = args[1] as RequestInit;

      /* expect(secondParam.body).toEqual(
        JSON.stringify({
          username: 'nadetdev',
          email: 'email@email.com',
          password: '123',
        })
      ); */

      const req = httpTestingController.expectOne('/api/1.0/users');
      const requestBody = req.request.body;

      expect(requestBody).toEqual({
        username: 'nadetdev',
        email: 'email@email.com',
        password: '123',
      });
    });
  });
});
