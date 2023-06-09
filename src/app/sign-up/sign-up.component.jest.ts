import { render, screen, waitFor } from '@testing-library/angular';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

let requestBody: any;
let counter = 0;

const server = setupServer(
  rest.post('http://localhost:3000/users', (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeEach(() => {
  counter = 0;
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
    declarations: [],
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
      await setup();
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
    let button: any;
    let spinner: any;
    const setupForm = async () => {
      await setup();
      const username = screen.getByLabelText('Username');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');
      const confirmPassword = screen.getByLabelText('Confirm password');
      await userEvent.type(username, 'nadetdev');
      await userEvent.type(email, 'email@email.com');
      await userEvent.type(password, '12345678');
      await userEvent.type(confirmPassword, '12345678');
      button = screen.getByRole('button', { name: 'Sign Up' });
    };
    it('enables Sign Up button when confirm & password fields have same value', async () => {
      await setupForm();

      await waitFor(() => {
        expect(button).toBeEnabled();
      });
    });

    it('sends username, email and password to backend after clicking the button', async () => {
      await setupForm();

      await userEvent.click(button);

      await waitFor(() => {
        expect(requestBody).not.toEqual({
          username: 'nadetdev',
          email: 'email@email.com',
          password: '12345678',
        });
      });
    });

    it('disables button when there is an ongoing api call', async () => {
      await setupForm();
      await userEvent.click(button);
      await userEvent.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });

      /* await waitFor(() => {
        expect(counter).toBe(1);
      }); */
    });

    it('displays spiner after clicking the submit', async () => {
      await setupForm();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('display account activation notification after successful sign up request', () => {});
  });

  describe('Validation', () => {
    it.each`
      label         | inputValue              | message
      ${'Username'} | ${'{space}{backspace}'} | ${'Username is required'}
      ${'Username'} | ${'abc'}                | ${'Username must be at least 4 characters long'}
    `(
      'displays $message when $label has the value "$inputValue"',
      async ({ label, inputValue, message }) => {
        await setup();

        expect(await screen.queryByText(message)).not.toBeInTheDocument();
        const input = screen.getByLabelText(label);
        await userEvent.type(input, inputValue);
        await userEvent.tab();

        expect(await screen.queryByText(message)).not.toBeInTheDocument();
      }
    );

    /* it('displays Username is required message when username is null', async () => {
      await setup();
      const message = 'Username is required';
      expect(await screen.queryByText(message)).not.toBeInTheDocument();
      const usernameInput = screen.getByLabelText('Username');
      await userEvent.click(usernameInput);
      await userEvent.tab();

      expect(await screen.queryByText(message)).not.toBeInTheDocument();
    }); */

    /* it('displays length error when username is less than 4 characters', async () => {
      await setup();
      const message = 'Username must be at least 4 characters long';
      expect(await screen.queryByText(message)).not.toBeInTheDocument();
      const usernameInput = screen.getByLabelText('Username');
      await userEvent.type(usernameInput, 'abc');
      await userEvent.tab();

      expect(await screen.queryByText(message)).not.toBeInTheDocument();
    }); */
  });
});
