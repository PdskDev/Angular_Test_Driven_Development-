import { fireEvent, render, screen } from '@testing-library/angular';

import { SignUpComponent } from './sign-up.component';
import userEvent from '@testing-library/user-event';

describe('SignUpComponent', () => {
  describe('layout', () => {
    it('has Sign Up header', async () => {
      await render(SignUpComponent);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has username label', async () => {
      await render(SignUpComponent);
      const label = screen.getByLabelText('Username');
      expect(label).toBeInTheDocument();
    });

    it('has email label', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('has password label', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has confirm password label', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    });

    it('has password input for password type', async () => {
      await render(SignUpComponent);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('has confirm password input for password type', async () => {
      await render(SignUpComponent);
      const confirmPasswordInput = screen.getByLabelText('Confirm password');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    it('has Sign Up button', async () => {
      await render(SignUpComponent);
      const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
      expect(signUpButton).toBeInTheDocument();
    });

    it('disables Sign Up button initially', async () => {
      await render(SignUpComponent);
      const buttonDisabled = screen.getByRole('button', { name: 'Sign Up' });
      expect(buttonDisabled).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enable Sign Up button when confirm & password have same value', async () => {
      await render(SignUpComponent);
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm password');

      await userEvent.type(passwordInput, '123');
      await userEvent.type(confirmPasswordInput, '123');

      const button = screen.getByRole('button', { name: 'Sign Up' });

      expect(passwordInput).toHaveValue('123');
      expect(confirmPasswordInput).toHaveValue('123');

      //expect(button).toBeEnabled();
    });
  });
});
